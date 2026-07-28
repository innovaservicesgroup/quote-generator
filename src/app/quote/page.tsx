"use client";

import { useState } from "react";
import { ValueBracket, QuoteData } from "@/lib/templates/shared/types";
import { getTemplate } from "@/lib/templates/registry";
import { buildDefaultQuoteData } from "@/lib/templates/defaults";
import StepIndicator from "@/components/wizard/StepIndicator";
import Step1Bracket from "@/components/wizard/Step1Bracket";
import Step2Template from "@/components/wizard/Step2Template";
import Step3ClientDetails from "@/components/wizard/Step3ClientDetails";
import Step4Services from "@/components/wizard/Step4Services";
import Step5Review from "@/components/wizard/Step5Review";

export default function QuoteWizardPage() {
  const [step, setStep] = useState(1);
  const [bracket, setBracket] = useState<ValueBracket | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const meta = templateId ? getTemplate(templateId) : null;

  const selectTemplate = (id: string) => {
    setTemplateId(id);
    setQuoteData(buildDefaultQuoteData(id));
  };

  const restart = () => {
    setStep(1);
    setBracket(null);
    setTemplateId(null);
    setQuoteData(null);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-[#006b86] tracking-wide">
              INNOVA SERVICES GROUP
            </div>
            <div className="text-xs text-gray-400">Quote Generator</div>
          </div>
          {step > 1 && (
            <button
              onClick={restart}
              className="text-xs text-gray-400 hover:text-[#006b86]"
            >
              Start over
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 sm:py-10">
        <StepIndicator current={step} />

        {step === 1 && (
          <Step1Bracket
            value={bracket}
            onChange={setBracket}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && bracket && (
          <Step2Template
            bracket={bracket}
            value={templateId}
            onChange={selectTemplate}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && meta && quoteData && (
          <Step3ClientDetails
            meta={meta}
            client={quoteData.client}
            reference={quoteData.reference}
            onClientChange={(client) => setQuoteData({ ...quoteData, client })}
            onReferenceChange={(reference) =>
              setQuoteData({ ...quoteData, reference })
            }
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && meta && quoteData && (
          <Step4Services
            meta={meta}
            quoteData={quoteData}
            onChange={setQuoteData}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && meta && quoteData && (
          <Step5Review
            meta={meta}
            quoteData={quoteData}
            onChange={setQuoteData}
            onBack={() => setStep(4)}
          />
        )}
      </main>
    </div>
  );
}
