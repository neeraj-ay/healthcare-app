import React, { useState } from "react";

export default function ReportScheduler({ onSchedule = () => {} }) {
  const [name, setName] = useState("");

  return (
    <div className="bg-white p-3 rounded shadow-sm mb-4">
      <h3 className="font-semibold mb-2">Schedule Report</h3>
      <input
        placeholder="Report name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-2 py-1 rounded mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!name) return;
            onSchedule(name);
            setName("");
          }}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Save & Run
        </button>
        <button
          onClick={() => setName("")}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
