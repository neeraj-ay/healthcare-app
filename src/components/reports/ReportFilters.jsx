import React from "react";

export default function ReportFilters({
  departments = [],
  filters = {},
  onChange = () => {},
  onRun = () => {},
}) {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-semibold mb-3">Filters</h3>

      <div className="mb-2">
        <label className="block text-xs text-gray-600 mb-1">Start date</label>
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => update({ startDate: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs text-gray-600 mb-1">End date</label>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => update({ endDate: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs text-gray-600 mb-1">Department</label>
        <select
          value={filters.department || "all"}
          onChange={(e) => update({ department: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Granularity</label>
        <select
          value={filters.granularity || "day"}
          onChange={(e) => update({ granularity: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onRun}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Run Report
        </button>
        <button
          onClick={() => {
            onChange({
              startDate: "",
              endDate: "",
              department: "all",
              granularity: "day",
            });
          }}
          className="px-3 py-1 border rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
