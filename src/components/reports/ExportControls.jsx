import React from "react";

export default function ExportControls({
  onExport = () => {},
  disabled = false,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onExport}
        disabled={disabled}
        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Export CSV
      </button>
    </div>
  );
}
