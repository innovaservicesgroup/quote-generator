"use client";

import { useEffect, useState } from "react";
import { QuoteData, TemplateMeta } from "@/lib/templates/shared/types";

export default function Step5Review({
  meta,
  quoteData,
  onChange,
  onBack,
  onSaveForLater,
}: {
  meta: TemplateMeta;
  quoteData: QuoteData;
  onChange: (d: QuoteData) => void;
  onBack: () => void;
  onSaveForLater: () => void;
}) {
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatingWord, setGeneratingWord] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingPreview(true);
    fetch("/api/preview-html", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quoteData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Preview failed");
        }
        return res.text();
      })
      .then((html) => {
        if (!cancelled) setPreviewHtml(html);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoadingPreview(false);
      });
    return () => {
      cancelled = true;
    };
  }, [quoteData]);

  const downloadFromEndpoint = async (endpoint: string, fallbackName: string) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quoteData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Generation failed");
    }
    const disposition = res.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="(.+)"/);
    const fileName = match ? match[1] : fallbackName;
    const blob = await res.blob();
    return { blob, fileName };
  };

  const fetchPdfBlob = async () => downloadFromEndpoint("/api/generate-pdf", "quote.pdf");

  const triggerDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    setGenerating(true);
    setError(null);
    try {
      const { blob, fileName } = await fetchPdfBlob();
      triggerDownload(blob, fileName);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadWord = async () => {
    setGeneratingWord(true);
    setError(null);
    try {
      const { blob, fileName } = await downloadFromEndpoint(
        "/api/generate-docx",
        "quote.docx"
      );
      triggerDownload(blob, fileName);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGeneratingWord(false);
    }
  };

  const updateAreaPricing = (patch: Partial<NonNullable<QuoteData["area"]>["pricing"]>) => {
    if (!quoteData.area) return;
    onChange({
      ...quoteData,
      area: { ...quoteData.area, pricing: { ...quoteData.area.pricing, ...patch } },
    });
  };

  const updateLineItemPricing = (patch: Partial<NonNullable<QuoteData["lineitem"]>["pricing"]>) => {
    if (!quoteData.lineitem) return;
    onChange({
      ...quoteData,
      lineitem: { ...quoteData.lineitem, pricing: { ...quoteData.lineitem.pricing, ...patch } },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
        Review & Export
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {meta.industry} — {quoteData.client.clientName || "Untitled client"}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {/* Final pricing check before export */}
      {meta.family === "area" && quoteData.area && (
        <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50">
          <h3 className="text-xs font-semibold text-[#006b86] mb-3 uppercase tracking-wide">
            Confirm pricing before export
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                Cost of Service / Month ($)
              </span>
              <input
                value={quoteData.area.pricing.costPerMonth}
                onChange={(e) => {
                  const monthly = e.target.value;
                  const parsed = parseFloat(monthly);
                  const autoTotal = !isNaN(parsed)
                    ? (parsed * 12).toFixed(2)
                    : quoteData.area!.pricing.contractPrice;
                  updateAreaPricing({ costPerMonth: monthly, contractPrice: autoTotal });
                }}
                placeholder="e.g. 2450.00"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                Total Contract Price (12 Months) ($)
              </span>
              <input
                value={quoteData.area.pricing.contractPrice}
                onChange={(e) => updateAreaPricing({ contractPrice: e.target.value })}
                placeholder="e.g. 29400.00"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                Frequency of Work
              </span>
              <input
                value={quoteData.area.pricing.frequencyOfWork}
                onChange={(e) => updateAreaPricing({ frequencyOfWork: e.target.value })}
                placeholder="e.g. 5 days/week"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
          </div>
        </div>
      )}

      {meta.family === "lineitem" && quoteData.lineitem && (
        <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50">
          <h3 className="text-xs font-semibold text-[#006b86] mb-3 uppercase tracking-wide">
            Confirm pricing before export
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                Subtotal ($)
              </span>
              <input
                value={quoteData.lineitem.pricing.subtotal}
                onChange={(e) => updateLineItemPricing({ subtotal: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                GST ($)
              </span>
              <input
                value={quoteData.lineitem.pricing.gst}
                onChange={(e) => updateLineItemPricing({ gst: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1">
                Total ($)
              </span>
              <input
                value={quoteData.lineitem.pricing.total}
                onChange={(e) => updateLineItemPricing({ total: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
            </label>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50" style={{ height: "65vh" }}>
        {loadingPreview ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Rendering preview…
          </div>
        ) : (
          <iframe
            title="Quote preview"
            srcDoc={previewHtml}
            className="w-full h-full bg-white"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-[#006b86] order-3 sm:order-1">
          ← Back
        </button>
        <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2 sm:ml-auto">
          <button
            onClick={onSaveForLater}
            className="border border-[#40aac4] text-[#006b86] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#40aac4]/5 transition-colors"
          >
            Save for Later
          </button>
          <button
            onClick={handleDownloadWord}
            disabled={generating || generatingWord}
            className="border border-[#40aac4] text-[#006b86] disabled:opacity-50 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#40aac4]/5 transition-colors"
          >
            {generatingWord ? "Generating Word…" : "Download Word"}
          </button>
          <button
            onClick={handleDownload}
            disabled={generating || generatingWord}
            className="bg-[#40aac4] disabled:bg-gray-300 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#369ab3] transition-colors"
          >
            {generating ? "Generating PDF…" : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
