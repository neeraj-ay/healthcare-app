import React from "react";

export default function KPIDisplay({ kpis = {} }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-50 p-3 rounded">
        <div className="text-xs text-gray-500">Total Admissions</div>
        <div className="text-xl font-semibold">{kpis.totalAdmissions ?? 0}</div>
      </div>
      <div className="bg-gray-50 p-3 rounded">
        <div className="text-xs text-gray-500">Unique Patients</div>
        <div className="text-xl font-semibold">{kpis.uniquePatients ?? 0}</div>
      </div>
      <div className="bg-gray-50 p-3 rounded">
        <div className="text-xs text-gray-500">Avg / Period</div>
        <div className="text-xl font-semibold">
          {kpis.avgAdmissionsPerPeriod ?? 0}
        </div>
      </div>
    </div>
  );
}
