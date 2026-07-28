"use client";

import { getTemplatesFor } from "@/lib/templates/registry";
import { ValueBracket } from "@/lib/templates/shared/types";

export default function Step2Template({
  bracket,
  value,
  onChange,
  onNext,
  onBack,
}: {
  bracket: ValueBracket;
  value: string | null;
  onChange: (templateId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const templates = getTemplatesFor(bracket);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
        Which template do you need?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Showing templates for{" "}
        <strong>{bracket === "under_50k" ? "Under $50k" : "Over $50k"}</strong>.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            disabled={!t.available}
            onClick={() => {
              if (!t.available) return;
              onChange(t.id);
              onNext();
            }}
            className={`text-left p-4 rounded-xl border-2 transition-colors flex items-center justify-between
              ${!t.available ? "opacity-50 cursor-not-allowed border-gray-200" : "hover:border-[#40aac4] hover:bg-[#40aac4]/5"}
              ${value === t.id ? "border-[#40aac4] bg-[#40aac4]/5" : "border-gray-200"}`}
          >
            <div>
              <div className="font-semibold text-[#006b86]">{t.industry}</div>
              <div className="text-xs text-gray-500">
                {t.family === "area"
                  ? "Recurring contract — duty schedule by area"
                  : t.family === "roomrate"
                  ? "Recurring contract — per-room-type pricing"
                  : "One-off — itemised specification & price"}
              </div>
            </div>
            {!t.available && (
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-500 px-2 py-1 rounded">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-6 text-sm text-gray-500 hover:text-[#006b86]"
      >
        ← Back
      </button>
    </div>
  );
}
