import React, { useState } from "react";
import ReportFilters from "../components/reports/ReportFilters";
import ReportChart from "../components/reports/ReportChart";
import KPIDisplay from "../components/reports/KPIDisplay";
import ExportControls from "../components/reports/ExportControls";
import ReportList from "../components/reports/ReportList";
import ReportScheduler from "../components/reports/ReportScheduler";
import ReportViewer from "../components/reports/ReportViewer";

export default function ReportsPage({
  departments = [],
  runAdhocReport,
  scheduleReport,
  scheduledReports = [],
  reportHistory = [],
  exportReportCSV,
}) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    department: "all",
    granularity: "day",
  });
  const [lastResult, setLastResult] = useState(null);
  const [viewerRows, setViewerRows] = useState([]);

  const handleRun = (f) => {
    setFilters(f);
    const res = runAdhocReport(f);
    setLastResult(res);
    setViewerRows(res.rows || []);
  };

  const handleExport = () => {
    if (!lastResult) return;
    exportReportCSV({
      rows: lastResult.rows,
      filename: `admissions_${Date.now()}.csv`,
    });
  };

  const handleSchedule = (name, f) => {
    scheduleReport({ name, filters: f });
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex gap-6">
        {/* left column: filters + scheduler + saved reports */}
        <div className="w-80">
          <div className="mb-4">
            <ReportFilters
              departments={departments}
              filters={filters}
              onChange={setFilters}
              onRun={() => handleRun(filters)}
            />
          </div>

          <ReportScheduler
            onSchedule={(name) => handleSchedule(name, filters)}
          />

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Scheduled Reports</h3>
            <ReportList reports={scheduledReports} />
          </div>
        </div>

        {/* right column: KPIs + chart + table + export */}
        <div className="flex-1 bg-white p-4 rounded shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Admissions Report</h2>
            <ExportControls onExport={handleExport} disabled={!lastResult} />
          </div>

          <KPIDisplay
            kpis={
              lastResult
                ? lastResult.kpis
                : {
                    totalAdmissions: 0,
                    uniquePatients: 0,
                    avgAdmissionsPerPeriod: 0,
                  }
            }
          />

          <div className="mt-4">
            <ReportChart
              series={lastResult ? lastResult.series : []}
              granularity={filters.granularity}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Report rows</h3>
            <ReportViewer rows={viewerRows} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Run history</h3>
            <ReportList
              reports={reportHistory}
              isHistory
              onView={(hist) => setViewerRows(hist.rows || [])}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
