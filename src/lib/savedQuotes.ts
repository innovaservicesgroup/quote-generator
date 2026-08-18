import { getStore } from "@netlify/blobs";
import { SavedQuoteRecord } from "./templates/shared/types";

// Shared, site-scoped store — every deploy of this site reads/writes the
// same "saved-quotes" store, so a quote saved today is still there after
// the next deploy. Netlify provisions this automatically; no setup needed
// once the site is deployed on Netlify.
function store() {
  return getStore("saved-quotes");
}

function key(id: string) {
  return `quote:${id}`;
}

export async function saveQuote(record: SavedQuoteRecord): Promise<void> {
  await store().setJSON(key(record.id), record);
}

export async function listQuotes(): Promise<SavedQuoteRecord[]> {
  const s = store();
  const { blobs } = await s.list({ prefix: "quote:" });
  const records = await Promise.all(
    blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<SavedQuoteRecord | null>)
  );
  return records
    .filter((r): r is SavedQuoteRecord => Boolean(r))
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

export async function getQuote(id: string): Promise<SavedQuoteRecord | null> {
  return (await store().get(key(id), { type: "json" })) as SavedQuoteRecord | null;
}

export async function deleteQuote(id: string): Promise<void> {
  await store().delete(key(id));
}
