import { NextRequest, NextResponse } from "next/server";
import { renderTemplate } from "@/lib/templates/renderers";
import { QuoteData } from "@/lib/templates/shared/types";
import { getTemplate } from "@/lib/templates/registry";

export const runtime = "nodejs";

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
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to render template: ${err.message}` },
      { status: 500 }
    );
  }
}
