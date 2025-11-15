import React from "react";

export default function ReportViewer({ rows = [] }) {
  if (!rows || rows.length === 0)
    return <div className="text-sm text-gray-500">No rows to show</div>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs">ID</th>
            <th className="px-3 py-2 text-left text-xs">Name</th>
            <th className="px-3 py-2 text-left text-xs">Age</th>
            <th className="px-3 py-2 text-left text-xs">Gender</th>
            <th className="px-3 py-2 text-left text-xs">Department</th>
            <th className="px-3 py-2 text-left text-xs">Outcome</th>
            <th className="px-3 py-2 text-left text-xs">Admission</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.patient_id + (r.admission_date || "")}>
              <td className="px-3 py-2 text-sm">{r.patient_id}</td>
              <td className="px-3 py-2 text-sm">{r.name}</td>
              <td className="px-3 py-2 text-sm">{r.age}</td>
              <td className="px-3 py-2 text-sm">{r.gender}</td>
              <td className="px-3 py-2 text-sm">{r.department}</td>
              <td className="px-3 py-2 text-sm">{r.outcome}</td>
              <td className="px-3 py-2 text-sm">{r.admission_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
