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
  const [saveError, setSaveError] = useState<string | null>(null);
  const [resumePrompt, setResumePrompt] = useState<SavedDraft | null>(null);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);
  const [namePromptOpen, setNamePromptOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
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

    let savedBy = "";
    try {
      savedBy = localStorage.getItem(SAVED_BY_KEY) || "";
    } catch {
      // ignore
    }

    if (!savedBy) {
      // Ask via an in-app modal rather than window.prompt() — native
      // browser dialogs are unreliable (sometimes silently a no-op) when
      // this app is running as an installed PWA / added-to-home-screen on
      // mobile, which this app supports. performSave() runs once the
      // modal is submitted.
      setNamePromptOpen(true);
      return;
    }

    await performSave(savedBy);
  };

  const performSave = async (savedBy: string) => {
    setSaveError(null);
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Save failed (status ${res.status})`);
      }
      setSavedNotice("Saved — visible to the whole team. Come back anytime via \"Saved Quotes\".");
      setTimeout(() => setSavedNotice(null), 5000);
    } catch (e: any) {
      // Surface the real error instead of failing silently — a save that
      // only landed in localStorage (not the shared store) needs to be
      // obvious, not look identical to a successful shared save.
      setSaveError(
        `Saved on this device only — couldn't reach shared storage (${e.message || "network error"}).`
      );
      setTimeout(() => setSaveError(null), 8000);
    }
  };

  const submitNamePrompt = async () => {
    const name = nameInput.trim();
    if (!name) return;
    try {
      localStorage.setItem(SAVED_BY_KEY, name);
    } catch {
      // ignore
    }
    setNamePromptOpen(false);
    setNameInput("");
    await performSave(name);
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
            {saveError && (
              <span className="text-xs text-red-600 font-medium max-w-[220px] sm:max-w-none">
                {saveError}
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

      {namePromptOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">
              Your name
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              So teammates know who saved this quote. Only asked once — remembered on this device after that.
            </p>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitNamePrompt()}
              placeholder="e.g. Coraline"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[#40aac4]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setNamePromptOpen(false);
                  setNameInput("");
                }}
                className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitNamePrompt}
                disabled={!nameInput.trim()}
                className="bg-[#40aac4] disabled:bg-gray-300 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#369ab3]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
