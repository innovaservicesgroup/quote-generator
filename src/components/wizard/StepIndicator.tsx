"use client";

const STEPS = [
  "Value Bracket",
  "Template",
  "Client Details",
  "Services & Pricing",
  "Review & Export",
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      {/* Mobile: compact "Step X of Y" + current label + progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>
            Step {current} of {STEPS.length}
          </span>
          <span className="font-semibold text-[#006b86]">{STEPS[current - 1]}</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#40aac4] transition-all"
            style={{ width: `${(current / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: full step circles + labels */}
      <div className="hidden sm:flex items-center justify-between">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const active = step === current;
          const done = step < current;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                    ${
                      done
                        ? "bg-[#40aac4] border-[#40aac4] text-white"
                        : active
                        ? "border-[#40aac4] text-[#006b86]"
                        : "border-gray-300 text-gray-400"
                    }`}
                >
                  {done ? "✓" : step}
                </div>
                <span
                  className={`mt-1.5 text-[11px] text-center leading-tight ${
                    active ? "text-[#006b86] font-semibold" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {step < STEPS.length && (
                <div
                  className={`h-0.5 flex-1 -mt-5 ${
                    done ? "bg-[#40aac4]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
