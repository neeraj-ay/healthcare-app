import React from "react";

export default function ReportList({
  reports = [],
  isHistory = false,
  onView = () => {},
}) {
  if (!reports || reports.length === 0)
    return <div className="text-sm text-gray-500">No items</div>;

  return (
    <ul className="space-y-2">
      {reports.map((r) => (
        <li
          key={r.id}
          className="flex items-center justify-between border p-2 rounded"
        >
          <div>
            <div className="text-sm font-medium">{r.name || r.id}</div>
            <div className="text-xs text-gray-500">
              {isHistory
                ? `Run: ${r.generatedAt}`
                : `Created: ${r.createdAt || r.filters?.startDate || ""}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isHistory && (
              <button
                onClick={() => onView(r)}
                className="text-sm text-blue-600"
              >
                View
              </button>
            )}
            <button className="text-sm text-gray-600">Download</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
