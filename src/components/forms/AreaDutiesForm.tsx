"use client";

import {
  AreaFamilyData,
  DutyArea,
  AdditionalServiceRow,
  ConsumableRow,
} from "@/lib/templates/shared/types";
import { TemplateMeta } from "@/lib/templates/shared/types";

const FREQUENCY_OPTIONS = [
  "Daily",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "Quarterly",
  "One-off",
];

export default function AreaDutiesForm({
  meta,
  data,
  onChange,
}: {
  meta: TemplateMeta;
  data: AreaFamilyData;
  onChange: (d: AreaFamilyData) => void;
}) {
  const updateArea = (id: string, patch: Partial<DutyArea>) => {
    onChange({
      ...data,
      areas: data.areas.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  };

  const addRow = (
    key: "additionalServices" | "consumables",
    empty: AdditionalServiceRow | ConsumableRow
  ) => {
    onChange({ ...data, [key]: [...(data[key] as any[]), empty] } as AreaFamilyData);
  };

  const updateRow = (
    key: "additionalServices" | "consumables",
    index: number,
    patch: any
  ) => {
    const rows = [...(data[key] as any[])];
    rows[index] = { ...rows[index], ...patch };
    onChange({ ...data, [key]: rows } as AreaFamilyData);
  };

  const removeRow = (key: "additionalServices" | "consumables", index: number) => {
    const rows = (data[key] as any[]).filter((_, i) => i !== index);
    onChange({ ...data, [key]: rows } as AreaFamilyData);
  };

  const addCustomItem = () => {
    onChange({
      ...data,
      customItems: [
        ...data.customItems,
        { id: crypto.randomUUID(), task: "", frequency: "" },
      ],
    });
  };

  const updateCustomItem = (id: string, patch: Partial<{ task: string; frequency: string }>) => {
    onChange({
      ...data,
      customItems: data.customItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const removeCustomItem = (id: string) => {
    onChange({
      ...data,
      customItems: data.customItems.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-[#006b86] mb-2">
          Schedule of Duties
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {meta.areasToggleable
            ? "Toggle off any area that doesn't apply to this site, and set the cleaning frequency for each area you keep. Task wording is fixed, professionally-written scope language."
            : "All areas are included on this template. Set the cleaning frequency for each."}
        </p>
        <div className="space-y-2">
          {data.areas.map((area) => (
            <div
              key={area.id}
              className={`border rounded-lg overflow-hidden ${
                area.included ? "border-gray-200" : "border-gray-100 opacity-50"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 px-3 py-2.5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  {meta.areasToggleable && (
                    <input
                      type="checkbox"
                      checked={area.included}
                      onChange={(e) =>
                        updateArea(area.id, { included: e.target.checked })
                      }
                      className="accent-[#40aac4] w-4 h-4"
                    />
                  )}
                  {area.name}
                </label>
                <select
                  value={area.frequency}
                  disabled={!area.included}
                  onChange={(e) => updateArea(area.id, { frequency: e.target.value })}
                  className="text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 disabled:bg-gray-100"
                >
                  <option value="">Frequency…</option>
                  {FREQUENCY_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              {area.included && (
                <ul className="px-4 py-2 text-xs text-gray-500 list-disc list-inside space-y-0.5">
                  {area.tasks.slice(0, 3).map((t, i) => (
                    <li key={i} className="truncate">
                      {t}
                    </li>
                  ))}
                  {area.tasks.length > 3 && (
                    <li className="text-gray-400">
                      +{area.tasks.length - 3} more task(s) included in the PDF
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">
            Custom Scope of Work{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </h3>
          <button
            onClick={addCustomItem}
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add custom item
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          For anything not covered by the standard areas above — e.g. "Hardwood
          floor in Building 3". Appears as its own line in the Schedule of Duties.
        </p>
        {data.customItems.length === 0 && (
          <p className="text-xs text-gray-400 italic mb-2">No custom items added.</p>
        )}
        {data.customItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_160px_auto] gap-2 mb-2"
          >
            <input
              value={item.task}
              onChange={(e) => updateCustomItem(item.id, { task: e.target.value })}
              placeholder="Custom task description"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
            />
            <select
              value={item.frequency}
              onChange={(e) => updateCustomItem(item.id, { frequency: e.target.value })}
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            >
              <option value="">Frequency…</option>
              {FREQUENCY_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeCustomItem(item.id)}
              className="text-gray-400 hover:text-red-500 text-base px-3 py-2 self-start"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#006b86] mb-2">
          Pricing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Cost of Service / Month ($)
            </span>
            <input
              value={data.pricing.costPerMonth}
              onChange={(e) =>
                onChange({
                  ...data,
                  pricing: { ...data.pricing, costPerMonth: e.target.value },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              placeholder="e.g. 2450.00"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Total Contract Price ($)
            </span>
            <input
              value={data.pricing.contractPrice}
              onChange={(e) =>
                onChange({
                  ...data,
                  pricing: { ...data.pricing, contractPrice: e.target.value },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              placeholder="e.g. 29400.00"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Overall Frequency of Work
            </span>
            <input
              value={data.pricing.frequencyOfWork}
              onChange={(e) =>
                onChange({
                  ...data,
                  pricing: { ...data.pricing, frequencyOfWork: e.target.value },
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              placeholder="e.g. 5 days/week"
            />
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">
            Additional Services{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </h3>
          <button
            onClick={() =>
              addRow("additionalServices", { service: "", frequency: "", charge: "" })
            }
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add row
          </button>
        </div>
        {data.additionalServices.map((row, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-2">
            <input
              value={row.service}
              onChange={(e) => updateRow("additionalServices", i, { service: e.target.value })}
              placeholder="Service"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <input
              value={row.frequency}
              onChange={(e) => updateRow("additionalServices", i, { frequency: e.target.value })}
              placeholder="Frequency"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <input
              value={row.charge}
              onChange={(e) => updateRow("additionalServices", i, { charge: e.target.value })}
              placeholder="Charge / service"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <button
              onClick={() => removeRow("additionalServices", i)}
              className="text-gray-400 hover:text-red-500 text-base px-3 py-2 self-start"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">
            Popular Consumables{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </h3>
          <button
            onClick={() =>
              addRow("consumables", { product: "", quantity: "", qtyPerCarton: "" })
            }
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add row
          </button>
        </div>
        {data.consumables.map((row, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-2">
            <input
              value={row.product}
              onChange={(e) => updateRow("consumables", i, { product: e.target.value })}
              placeholder="Product"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <input
              value={row.quantity}
              onChange={(e) => updateRow("consumables", i, { quantity: e.target.value })}
              placeholder="Quantity"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <input
              value={row.qtyPerCarton}
              onChange={(e) => updateRow("consumables", i, { qtyPerCarton: e.target.value })}
              placeholder="Qty per Carton"
              className="rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm"
            />
            <button
              onClick={() => removeRow("consumables", i)}
              className="text-gray-400 hover:text-red-500 text-base px-3 py-2 self-start"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
