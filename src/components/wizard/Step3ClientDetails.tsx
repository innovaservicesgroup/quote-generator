"use client";

import { ClientDetails, ReferenceScheduleData, TemplateMeta } from "@/lib/templates/shared/types";
import Field from "./Field";

export default function Step3ClientDetails({
  meta,
  client,
  reference,
  innovaRepresentative,
  onClientChange,
  onReferenceChange,
  onRepresentativeChange,
  onNext,
  onBack,
}: {
  meta: TemplateMeta;
  client: ClientDetails;
  reference: ReferenceScheduleData;
  innovaRepresentative: string;
  onClientChange: (c: ClientDetails) => void;
  onReferenceChange: (r: ReferenceScheduleData) => void;
  onRepresentativeChange: (rep: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const set = (k: keyof ClientDetails) => (v: string) =>
    onClientChange({ ...client, [k]: v });
  const setRef = (k: keyof ReferenceScheduleData) => (v: string) =>
    onReferenceChange({ ...reference, [k]: v });

  const canContinue = client.clientName.trim() && client.emailAddress.trim();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
        Client details
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        These populate the {meta.family === "lineitem" ? "Specification" : "Quotation"} Schedule.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Quote Number"
          value={client.quotationNumber}
          onChange={set("quotationNumber")}
          placeholder="e.g. Q-1042"
        />
        <Field
          label="Date"
          type="date"
          value={client.date}
          onChange={set("date")}
        />
        <Field
          label={meta.family === "lineitem" ? "Company" : "Client Name"}
          value={client.clientName}
          onChange={set("clientName")}
        />
        <Field
          label={meta.family === "lineitem" ? "Work Location" : "Commercial Premises Address"}
          value={client.premisesAddress}
          onChange={set("premisesAddress")}
        />
        <Field
          label="Contact Name"
          value={client.contactName}
          onChange={set("contactName")}
        />
        <Field
          label="Phone Number"
          value={client.phoneNumber}
          onChange={set("phoneNumber")}
        />
        <Field
          label="Email Address"
          type="email"
          value={client.emailAddress}
          onChange={set("emailAddress")}
        />
        {meta.family === "lineitem" && (
          <Field
            label="Specification"
            value={client.specification || ""}
            onChange={set("specification")}
            placeholder="Brief description of the job"
          />
        )}
      </div>

      <h3 className="text-sm font-semibold text-[#006b86] mt-6 mb-3">
        Contract terms
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Term" value={reference.term} onChange={setRef("term")} />
        <Field
          label="Notice to Reschedule"
          value={reference.noticeToReschedule}
          onChange={setRef("noticeToReschedule")}
        />
        <label className="block">
          <span className="block text-xs font-semibold text-gray-600 mb-1">
            Innova Representative
          </span>
          <select
            value={innovaRepresentative}
            onChange={(e) => onRepresentativeChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
          >
            <option value="Pascal Dufroux">Pascal Dufroux</option>
            <option value="Celia Dufroux">Celia Dufroux</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-[#006b86]">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="bg-[#40aac4] disabled:bg-gray-300 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#369ab3] transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
