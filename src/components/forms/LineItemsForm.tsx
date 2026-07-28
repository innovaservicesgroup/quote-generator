"use client";

import { LineItemFamilyData } from "@/lib/templates/shared/types";

function calcTotals(items: { price: string }[]) {
  const subtotal = items.reduce((sum, i) => {
    const n = parseFloat(i.price);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
  const gst = subtotal * 0.1;
  const total = subtotal + gst;
  return {
    subtotal: subtotal.toFixed(2),
    gst: gst.toFixed(2),
    total: total.toFixed(2),
  };
}

export default function LineItemsForm({
  data,
  onChange,
}: {
  data: LineItemFamilyData;
  onChange: (d: LineItemFamilyData) => void;
}) {
  const addItem = () => {
    onChange({
      ...data,
      lineItems: [
        ...data.lineItems,
        { id: crypto.randomUUID(), description: "", price: "" },
      ],
    });
  };

  const updateItem = (id: string, patch: Partial<{ description: string; price: string }>) => {
    const lineItems = data.lineItems.map((li) =>
      li.id === id ? { ...li, ...patch } : li
    );
    onChange({ ...data, lineItems });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, lineItems: data.lineItems.filter((li) => li.id !== id) });
  };

  const autoCalc = () => {
    onChange({ ...data, pricing: calcTotals(data.lineItems) });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">
            Specification / Price per service
          </h3>
          <button
            onClick={addItem}
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            + Add line
          </button>
        </div>
        <div className="space-y-2">
          {data.lineItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_140px_auto] gap-2">
              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="e.g. High-pressure clean of external walkways and driveway"
                rows={1}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm resize-y focus:outline-none focus:border-[#40aac4]"
              />
              <input
                value={item.price}
                onChange={(e) => updateItem(item.id, { price: e.target.value })}
                placeholder="$ price"
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 text-base px-3 py-2 self-start"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[#006b86]">Totals</h3>
          <button
            onClick={autoCalc}
            className="text-xs text-[#006b86] font-semibold hover:underline"
          >
            Auto-calculate from lines (+10% GST)
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Subtotal ($)
            </span>
            <input
              value={data.pricing.subtotal}
              onChange={(e) =>
                onChange({ ...data, pricing: { ...data.pricing, subtotal: e.target.value } })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              GST ($)
            </span>
            <input
              value={data.pricing.gst}
              onChange={(e) =>
                onChange({ ...data, pricing: { ...data.pricing, gst: e.target.value } })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-gray-600 mb-1">
              Total ($)
            </span>
            <input
              value={data.pricing.total}
              onChange={(e) =>
                onChange({ ...data, pricing: { ...data.pricing, total: e.target.value } })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
