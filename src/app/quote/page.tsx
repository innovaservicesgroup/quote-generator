"use client";

import { useState, useEffect, useRef } from "react";
import { ValueBracket, QuoteData, SavedQuoteRecord } from "@/lib/templates/shared/types";
import { getTemplate } from "@/lib/templates/registry";
import { buildDefaultQuoteData } from "@/lib/templates/defaults";
import StepIndicator from "@/components/wizard/StepIndicator";
import Step1Bracket from "@/components/wizard/Step1Bracket";
import Step2Template from "@/components/wizard/Step2Template";
import Step3ClientDetails from "@/components/wizard/Step3ClientDetails";
import Step4Services from "@/components/wizard/Step4Services";
import Step5Review from "@/components/wizard/Step5Review";
import SavedQuotesList from "@/components/wizard/SavedQuotesList";

// Kept as a same-device fallback so "Save for later" still does *something*
// useful even if the shared save (Netlify Blobs, below) fails — e.g. no
// network. The shared save is what makes a quote visible to teammates.
const DRAFT_KEY = "innova-quote-draft";
const SAVED_BY_KEY = "innova-quote-saved-by";

interface SavedDraft {
  step: number;
  bracket: ValueBracket | null;
  templateId: string | null;
  quoteData: QuoteData | null;
  savedAt: string;
}

export default function QuoteWizardPage() {
  const [step, setStep] = useState(1);
  const [bracket, setBracket] = useState<ValueBracket | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState<SavedDraft | null>(null);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);
  const draftIdRef = useRef<string | null>(null);

  // On first load, check for a saved draft and offer to resume it.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft: SavedDraft = JSON.parse(raw);
        if (draft.quoteData) setResumePrompt(draft);
      }
    } catch {
      // ignore corrupted/unavailable storage
    }
  }, []);

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
    draftIdRef.current = null;
  };

  const saveForLater = async () => {
    // Always keep the same-device fallback copy.
    try {
      const draft: SavedDraft = {
        step,
        bracket,
        templateId,
        quoteData,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore — the shared save below is what matters most
    }

    // Ask once for a name to attribute the save to (remembered after that).
    let savedBy = "";
    try {
      savedBy = localStorage.getItem(SAVED_BY_KEY) || "";
    } catch {
      // ignore
    }
    if (!savedBy) {
      savedBy = window.prompt("Your name (so teammates know who saved this):") || "";
      if (savedBy) {
        try {
          localStorage.setItem(SAVED_BY_KEY, savedBy);
        } catch {
          // ignore
        }
      }
    }

    if (!draftIdRef.current) {
      draftIdRef.current = crypto.randomUUID();
    }

    const record: SavedQuoteRecord = {
      id: draftIdRef.current,
      step,
      bracket,
      templateId,
      quoteData,
      savedAt: new Date().toISOString(),
      savedBy: savedBy || "Someone",
    };

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      setSavedNotice("Saved — visible to the whole team. Come back anytime via \"Saved Quotes\".");
    } catch {
      setSavedNotice("Saved on this device only — couldn't reach shared storage.");
    }
    setTimeout(() => setSavedNotice(null), 5000);
  };

  const resumeDraft = () => {
    if (!resumePrompt) return;
    setStep(resumePrompt.step);
    setBracket(resumePrompt.bracket);
    setTemplateId(resumePrompt.templateId);
    setQuoteData(resumePrompt.quoteData);
    setResumePrompt(null);
  };

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setResumePrompt(null);
  };

  const resumeSavedQuote = (record: SavedQuoteRecord) => {
    draftIdRef.current = record.id;
    setStep(record.step);
    setBracket(record.bracket);
    setTemplateId(record.templateId);
    setQuoteData(record.quoteData);
    setShowSavedQuotes(false);
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
          <div className="flex items-center gap-4">
            {savedNotice && (
              <span className="text-xs text-[#006b86] font-medium max-w-[220px] sm:max-w-none">
                {savedNotice}
              </span>
            )}
            <button
              onClick={() => setShowSavedQuotes(true)}
              className="text-xs font-semibold text-[#006b86] border border-[#40aac4] rounded-lg px-3 py-1.5 hover:bg-[#40aac4]/5"
            >
              Saved Quotes
            </button>
            {step > 1 && quoteData && (
              <button
                onClick={saveForLater}
                className="text-xs font-semibold text-[#006b86] border border-[#40aac4] rounded-lg px-3 py-1.5 hover:bg-[#40aac4]/5"
              >
                Save for later
              </button>
            )}
            {step > 1 && (
              <button
                onClick={restart}
                className="text-xs text-gray-400 hover:text-[#006b86]"
              >
                Start over
              </button>
            )}
          </div>
        </div>
      </header>

      {resumePrompt && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
          <div className="bg-[#eef7f9] border border-[#40aac4] rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-sm text-[#006b86]">
              You have a saved quote from{" "}
              {new Date(resumePrompt.savedAt).toLocaleString()} — resume where you left off?
            </span>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={resumeDraft}
                className="bg-[#40aac4] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#369ab3]"
              >
                Resume
              </button>
              <button
                onClick={discardDraft}
                className="text-xs text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="px-4 py-6 sm:px-6 sm:py-10">
        {showSavedQuotes ? (
          <SavedQuotesList
            onResume={resumeSavedQuote}
            onClose={() => setShowSavedQuotes(false)}
          />
        ) : (
          <>
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
            innovaRepresentative={quoteData.innovaRepresentative}
            onClientChange={(client) => setQuoteData({ ...quoteData, client })}
            onReferenceChange={(reference) =>
              setQuoteData({ ...quoteData, reference })
            }
            onRepresentativeChange={(innovaRepresentative) =>
              setQuoteData({ ...quoteData, innovaRepresentative: innovaRepresentative as any })
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
            onSaveForLater={saveForLater}
          />
        )}
          </>
        )}
      </main>
    </div>
  );
}
