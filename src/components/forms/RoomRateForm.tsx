"use client";

import { RoomRateFamilyData } from "@/lib/templates/shared/types";

export default function RoomRateForm({
  data,
  onChange,
}: {
  data: RoomRateFamilyData;
  onChange: (d: RoomRateFamilyData) => void;
}) {
  const updateRoom = (id: string, patch: Partial<RoomRateFamilyData["rooms"][number]>) => {
    onChange({
      ...data,
      rooms: data.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#006b86] mb-2">
          Room cost ("Contract Price")
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Set a rate per room type for each service type. Leave a cell blank if that
          combination doesn't apply — it'll show as "TBC" on the PDF.
        </p>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="py-1 px-1">Room type</th>
                <th className="py-1 px-1">Daily ($)</th>
                <th className="py-1 px-1">Midstay ($)</th>
                <th className="py-1 px-1">Departure ($)</th>
              </tr>
            </thead>
            <tbody>
              {data.rooms.map((room) => (
                <tr key={room.id} className="border-t border-gray-100">
                  <td className="py-1.5 px-1 font-medium text-gray-700 whitespace-nowrap">
                    {room.roomType}
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      value={room.dailyRate}
                      onChange={(e) => updateRoom(room.id, { dailyRate: e.target.value })}
                      className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      value={room.midstayRate}
                      onChange={(e) => updateRoom(room.id, { midstayRate: e.target.value })}
                      className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      value={room.departureRate}
                      onChange={(e) => updateRoom(room.id, { departureRate: e.target.value })}
                      className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="block text-xs font-semibold text-gray-600 mb-1">
            Minimum shift engagement
          </span>
          <input
            value={data.minimumShiftEngagement}
            onChange={(e) => onChange({ ...data, minimumShiftEngagement: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-gray-600 mb-1">
            Frequency of Work
          </span>
          <select
            value={data.frequencyOfWork}
            onChange={(e) => onChange({ ...data, frequencyOfWork: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#40aac4]"
          >
            <option value="On demand (per shift basis)">On demand (per shift basis)</option>
            <option value="Ongoing (pre-determined recurring shifts)">
              Ongoing (pre-determined recurring shifts)
            </option>
          </select>
        </label>
      </div>
    </div>
  );
}
