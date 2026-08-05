import { NextRequest, NextResponse } from "next/server";
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
      { error: `The "${meta.industry}" template isn't built yet.` },
      { status: 501 }
    );
  }

  try {
    const html = renderTemplate(data);
    const HTMLtoDOCX = (await import("html-to-docx")).default;
    const docxBuffer = await HTMLtoDOCX(html, undefined, {
      table: { row: { cantSplit: true } },
      footer: false,
      pageNumber: false,
    });

    const fileSafeClient = (data.client?.clientName || "quote")
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase();
    const fileName = `${fileSafeClient}_${meta.industry
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase()}_quote.docx`;

    return new NextResponse(Buffer.from(docxBuffer as ArrayBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Word document generation failed: ${err.message}` },
      { status: 500 }
    );
  }
}
