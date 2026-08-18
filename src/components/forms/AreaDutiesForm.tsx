"use client";

import { useRef } from "react";
import {
  AreaFamilyData,
  DutyArea,
  AdditionalServiceRow,
  ConsumableRow,
} from "@/lib/templates/shared/types";
import { TemplateMeta } from "@/lib/templates/shared/types";
import { COMMON_TASKS, COMMON_COVERAGE_NOTES } from "@/lib/templates/data/commonTasks";

const CUSTOM_OPTION = "__custom__";

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
  const coverageInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const taskInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const updateArea = (id: string, patch: Partial<DutyArea>) => {
    onChange({
      ...data,
      areas: data.areas.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  };

  const updateAreaTaskText = (areaId: string, taskId: string, value: string) => {
    onChange({
      ...data,
      areas: data.areas.map((a) =>
        a.id === areaId
          ? { ...a, tasks: a.tasks.map((t) => (t.id === taskId ? { ...t, text: value } : t)) }
          : a
      ),
    });
  };

  const updateAreaTaskFrequency = (areaId: string, taskId: string, value: string) => {
    onChange({
      ...data,
      areas: data.areas.map((a) =>
        a.id === areaId
          ? { ...a, tasks: a.tasks.map((t) => (t.id === taskId ? { ...t, frequency: value } : t)) }
          : a
      ),
    });
  };

  const addAreaTask = (areaId: string) => {
    onChange({
      ...data,
      areas: data.areas.map((a) =>
        a.id === areaId
          ? {
              ...a,
              tasks: [
                ...a.tasks,
                { id: crypto.randomUUID(), text: "", frequency: "" },
              ],
            }
          : a
      ),
    });
  };

  const removeAreaTask = (areaId: string, taskId: string) => {
    onChange({
      ...data,
      areas: data.areas.map((a) =>
        a.id === areaId
          ? { ...a, tasks: a.tasks.filter((t) => t.id !== taskId) }
          : a
      ),
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

  const addCoverageNote = () => {
    onChange({ ...data, serviceCoverageNotes: [...data.serviceCoverageNotes, ""] });
  };

  const updateCoverageNote = (index: number, value: string) => {
    const notes = [...data.serviceCoverageNotes];
    notes[index] = value;
    onChange({ ...data, serviceCoverageNotes: notes });
  };

  const removeCoverageNote = (index: number) => {
    onChange({
      ...data,
      serviceCoverageNotes: data.serviceCoverageNotes.filter((_, i) => i !== index),
    });
  };

  const addCustomSection = () => {
    onChange({
      ...data,
      customSections: [
        ...data.customSections,
        {
          id: crypto.randomUUID(),
          header: "",
          tasks: [{ id: crypto.randomUUID(), task: "", frequency: "" }],
        },
      ],
    });
  };

  const updateSectionHeader = (sectionId: string, header: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map((s) =>
        s.id === sectionId ? { ...s, header } : s
      ),
    });
  };

  const removeSection = (sectionId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter((s) => s.id !== sectionId),
    });
  };

  const addTaskToSection = (sectionId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              tasks: [...s.tasks, { id: crypto.randomUUID(), task: "", frequency: "" }],
            }
          : s
      ),
    });
  };

  const updateTask = (
    sectionId: string,
    taskId: string,
    patch: Partial<{ task: string; frequency: string }>
  ) => {
    onChange({
      ...data,
      customSections: data.customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)),
            }
          : s
      ),
    });
  };

  const removeTask = (sectionId: string, taskId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map((s) =>
        s.id === sectionId ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) } : s
      ),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">
            Service Coverage <span className="text-gray-400 font-normal">(optional)</span>
          </h3>
          <button
            onClick={addCoverageNote}
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add line
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Short lines describing what's covered — shown as a checklist at the top of
          the quote. Type freely, or use the quick-pick dropdown.
        </p>
        {data.serviceCoverageNotes.length === 0 && (
          <p className="text-xs text-gray-400 italic mb-2">No coverage lines added.</p>
        )}
        <div className="space-y-2">
          {data.serviceCoverageNotes.map((note, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <input
                ref={(el) => {
                  coverageInputRefs.current[i] = el;
                }}
                value={note}
                onChange={(e) => updateCoverageNote(i, e.target.value)}
                placeholder="Type a coverage line, or pick one →"
                className="flex-1 rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value === CUSTOM_OPTION) {
                    coverageInputRefs.current[i]?.focus();
                    return;
                  }
                  if (e.target.value) updateCoverageNote(i, e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-gray-500 sm:w-56"
                title="Quick-fill from common coverage lines, or type your own"
              >
                <option value="">Quick pick…</option>
                <option value={CUSTOM_OPTION}>✏️ Custom (type your own)</option>
                {COMMON_COVERAGE_NOTES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeCoverageNote(i)}
                className="text-gray-400 hover:text-red-500 text-base px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#006b86] mb-2">
          Schedule of Duties
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {meta.areasToggleable
            ? "Toggle off any area that doesn't apply to this site, and set the cleaning frequency for each area you keep. Task wording starts as professionally-written scope language — edit, remove, or add lines as needed for this site."
            : "All areas are included on this template. Set the cleaning frequency for each, and edit the task wording if this site needs something different."}
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
                <div className="px-3 py-2.5 space-y-1.5">
                  {area.tasks.map((t) => (
                    <div key={t.id} className="flex flex-col sm:flex-row gap-2">
                      <input
                        ref={(el) => {
                          taskInputRefs.current[t.id] = el;
                        }}
                        value={t.text}
                        onChange={(e) =>
                          updateAreaTaskText(area.id, t.id, e.target.value)
                        }
                        placeholder="Task wording…"
                        className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#40aac4]"
                      />
                      <select
                        value={t.frequency}
                        onChange={(e) =>
                          updateAreaTaskFrequency(area.id, t.id, e.target.value)
                        }
                        title="Leave as 'Same as area' unless this task runs on a different schedule"
                        className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 text-gray-600 sm:w-40"
                      >
                        <option value="">Same as area</option>
                        {FREQUENCY_OPTIONS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeAreaTask(area.id, t.id)}
                        className="text-gray-400 hover:text-red-500 text-base px-2 self-start sm:self-auto"
                        title="Remove this line"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAreaTask(area.id)}
                    className="text-xs text-[#006b86] font-semibold hover:underline"
                  >
                    + Add line
                  </button>
                  <p className="text-[11px] text-gray-400">
                    Most tasks follow the area's frequency above ({area.frequency || "not set"}).
                    Only change a line's dropdown if it runs on a different schedule — e.g.
                    daily sweeping but a weekly high-pressure wash.
                  </p>
                </div>
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
            onClick={addCustomSection}
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add area
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          For anything not covered by the standard areas above. Give it a
          header — e.g. "Building 3 — Bathroom" — then pick tasks for it.
        </p>
        {data.customSections.length === 0 && (
          <p className="text-xs text-gray-400 italic mb-2">No custom areas added.</p>
        )}
        <div className="space-y-4">
          {data.customSections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2.5">
                <input
                  value={section.header}
                  onChange={(e) => updateSectionHeader(section.id, e.target.value)}
                  placeholder='Header — e.g. "Building 3 — Bathroom"'
                  className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-base sm:text-sm font-medium focus:outline-none focus:border-[#40aac4]"
                />
                <button
                  onClick={() => removeSection(section.id)}
                  className="text-gray-400 hover:text-red-500 text-base px-2"
                  title="Remove this area"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 space-y-2">
                {section.tasks.map((t) => (
                  <div
                    key={t.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        ref={(el) => {
                          taskInputRefs.current[t.id] = el;
                        }}
                        value={t.task}
                        onChange={(e) =>
                          updateTask(section.id, t.id, { task: e.target.value })
                        }
                        placeholder="Type a task, or pick one →"
                        className="flex-1 rounded-lg border border-gray-300 px-2.5 py-2 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
                      />
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value === CUSTOM_OPTION) {
                            taskInputRefs.current[t.id]?.focus();
                            return;
                          }
                          if (e.target.value) {
                            updateTask(section.id, t.id, { task: e.target.value });
                          }
                        }}
                        className="rounded-lg border border-gray-300 px-2 py-2 text-sm text-gray-500 sm:w-40"
                        title="Quick-fill from common tasks, or type your own"
                      >
                        <option value="">Quick pick…</option>
                        <option value={CUSTOM_OPTION}>✏️ Custom</option>
                        {COMMON_TASKS.map((task) => (
                          <option key={task} value={task}>
                            {task}
                          </option>
                        ))}
                      </select>
                    </div>
                    <select
                      value={t.frequency}
                      onChange={(e) =>
                        updateTask(section.id, t.id, { frequency: e.target.value })
                      }
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
                      onClick={() => removeTask(section.id, t.id)}
                      className="text-gray-400 hover:text-red-500 text-base px-3 py-2 self-start"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addTaskToSection(section.id)}
                  className="text-xs text-[#006b86] font-semibold hover:underline"
                >
                  + Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#006b86] mb-2">
          Pricing
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          The total updates automatically as ×12 the monthly cost — feel free to
          adjust it manually afterward for pro-rated or custom contracts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Cost of Service / Month ($)
            </span>
            <input
              value={data.pricing.costPerMonth}
              onChange={(e) => {
                const monthly = e.target.value;
                const parsed = parseFloat(monthly);
                const autoTotal = !isNaN(parsed) ? (parsed * 12).toFixed(2) : data.pricing.contractPrice;
                onChange({
                  ...data,
                  pricing: { ...data.pricing, costPerMonth: monthly, contractPrice: autoTotal },
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              placeholder="e.g. 2450.00"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Total Contract Price (12 Months) ($)
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
