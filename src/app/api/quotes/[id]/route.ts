import { NextRequest, NextResponse } from "next/server";
import { getQuote, deleteQuote } from "@/lib/savedQuotes";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const quote = await getQuote(id);
    if (!quote) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ quote });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to load quote: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteQuote(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to delete quote: ${err.message}` },
      { status: 500 }
    );
  }
}
