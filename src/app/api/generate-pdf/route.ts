import { NextRequest, NextResponse } from "next/server";
import { launchBrowser } from "@/lib/browser";
import { renderTemplate } from "@/lib/templates/renderers";
import { QuoteData } from "@/lib/templates/shared/types";
import { getTemplate } from "@/lib/templates/registry";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let data: QuoteData;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const meta = getTemplate(data?.templateId);
  if (!meta) {
    return NextResponse.json(
      { error: `Unknown templateId "${data?.templateId}"` },
      { status: 400 }
    );
  }
  if (!meta.available) {
    return NextResponse.json(
      {
        error: `The "${meta.industry}" (${meta.bracket}) template isn't built yet. See src/lib/templates/renderers for how to add it.`,
      },
      { status: 501 }
    );
  }

  let html: string;
  try {
    html = renderTemplate(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to render template: ${err.message}` },
      { status: 500 }
    );
  }

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    const fileSafeClient = (data.client?.clientName || "quote")
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase();
    const fileName = `${fileSafeClient}_${meta.industry
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase()}_quote.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `PDF generation failed: ${err.message}` },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
