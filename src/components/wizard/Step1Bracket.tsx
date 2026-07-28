"use client";

import { ValueBracket } from "@/lib/templates/shared/types";

export default function Step1Bracket({
  value,
  onChange,
  onNext,
}: {
  value: ValueBracket | null;
  onChange: (v: ValueBracket) => void;
  onNext: () => void;
}) {
  const options: { id: ValueBracket; label: string; desc: string }[] = [
    {
      id: "under_50k",
      label: "Under $50k",
      desc: "One-off jobs, high-pressure jobs, smaller recurring contracts",
    },
    {
      id: "over_50k",
      label: "Over $50k",
      desc: "Larger recurring contracts — office, body corporate, etc.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
        What's the project value bracket?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        This determines which set of templates you'll choose from next.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              onChange(opt.id);
              onNext();
            }}
            className={`text-left p-5 rounded-xl border-2 transition-colors hover:border-[#40aac4] hover:bg-[#40aac4]/5 ${
              value === opt.id
                ? "border-[#40aac4] bg-[#40aac4]/5"
                : "border-gray-200"
            }`}
          >
            <div className="text-lg font-semibold text-[#006b86]">
              {opt.label}
            </div>
            <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
