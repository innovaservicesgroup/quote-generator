"use client";

import { useEffect, useState } from "react";
import { SavedQuoteRecord } from "@/lib/templates/shared/types";
import { getTemplate } from "@/lib/templates/registry";

export default function SavedQuotesList({
  onResume,
  onClose,
}: {
  onResume: (record: SavedQuoteRecord) => void;
  onClose: () => void;
}) {
  const [quotes, setQuotes] = useState<SavedQuoteRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setError(null);
    fetch("/api/quotes")
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to load saved quotes");
        }
        return res.json();
      })
      .then((data) => setQuotes(data.quotes))
      .catch((e) => setError(e.message));
  };

  useEffect(load, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      setQuotes((prev) => (prev ? prev.filter((q) => q.id !== id) : prev));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Saved Quotes</h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-[#006b86]"
        >
          ← Back
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Shared across the team — anyone can resume or delete a saved quote below.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {quotes === null && !error && (
        <p className="text-sm text-gray-400">Loading saved quotes…</p>
      )}

      {quotes && quotes.length === 0 && (
        <p className="text-sm text-gray-400 italic">No saved quotes yet.</p>
      )}

      <div className="space-y-3">
        {quotes?.map((q) => {
          const meta = q.templateId ? getTemplate(q.templateId) : null;
          const clientName = q.quoteData?.client?.clientName || "Untitled client";
          return (
            <div
              key={q.id}
              className="border border-gray-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold text-[#1a1a1a]">
                  {clientName}
                  {meta && (
                    <span className="text-gray-400 font-normal">
                      {" "}
                      — {meta.industry}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Saved by {q.savedBy || "someone"} ·{" "}
                  {new Date(q.savedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onResume(q)}
                  className="bg-[#40aac4] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#369ab3]"
                >
                  Resume
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  disabled={deletingId === q.id}
                  className="text-xs text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  {deletingId === q.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
