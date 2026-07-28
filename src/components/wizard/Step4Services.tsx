"use client";

import { QuoteData, TemplateMeta } from "@/lib/templates/shared/types";
import AreaDutiesForm from "../forms/AreaDutiesForm";
import LineItemsForm from "../forms/LineItemsForm";
import RoomRateForm from "../forms/RoomRateForm";

export default function Step4Services({
  meta,
  quoteData,
  onChange,
  onNext,
  onBack,
}: {
  meta: TemplateMeta;
  quoteData: QuoteData;
  onChange: (d: QuoteData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
        Table of Services
      </h2>
      <p className="text-sm text-gray-500 mb-6">{meta.industry}</p>

      {meta.family === "area" && quoteData.area && (
        <AreaDutiesForm
          meta={meta}
          data={quoteData.area}
          onChange={(area) => onChange({ ...quoteData, area })}
        />
      )}

      {meta.family === "lineitem" && quoteData.lineitem && (
        <LineItemsForm
          data={quoteData.lineitem}
          onChange={(lineitem) => onChange({ ...quoteData, lineitem })}
        />
      )}

      {meta.family === "roomrate" && quoteData.roomrate && (
        <RoomRateForm
          data={quoteData.roomrate}
          onChange={(roomrate) => onChange({ ...quoteData, roomrate })}
        />
      )}

      <div className="flex items-center justify-between mt-8">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-[#006b86]">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#40aac4] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#369ab3] transition-colors"
        >
          Review Quote →
        </button>
      </div>
    </div>
  );
}
