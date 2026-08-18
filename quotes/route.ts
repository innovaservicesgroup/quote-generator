import { NextRequest, NextResponse } from "next/server";
import { saveQuote, listQuotes } from "@/lib/savedQuotes";
import { SavedQuoteRecord } from "@/lib/templates/shared/types";

export const runtime = "nodejs";

// GET /api/quotes — list all saved quote drafts (most recent first), for
// the shared "Saved Quotes" screen. Returns full records; the list view
// only displays the metadata fields, but keeping this simple (one call,
// no separate summary endpoint) is fine at the scale of an internal tool.
export async function GET() {
  try {
    const quotes = await listQuotes();
    return NextResponse.json({ quotes });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to load saved quotes: ${err.message}` },
      { status: 500 }
    );
  }
}

// POST /api/quotes — save or update a quote draft. The client generates
// the id (crypto.randomUUID()) the first time it saves, then reuses that
// same id on subsequent saves so "Save for Later" updates the same entry
// instead of creating duplicates.
export async function POST(req: NextRequest) {
  let record: SavedQuoteRecord;
  try {
    record = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!record?.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await saveQuote(record);
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to save quote: ${err.message}` },
      { status: 500 }
    );
  }
}
