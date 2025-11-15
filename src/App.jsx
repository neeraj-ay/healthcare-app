import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import KPIcard from "./components/KPIcard";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import BedOccupancyChart from "./components/BedOccupancyChart";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage"; // new
import data from "./data/patients.json";

export default function App() {
  // --- existing centralized patient state ---
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const columns = [
    { label: "ID", field: "patient_id" },
    { label: "Name", field: "name" },
    { label: "Age", field: "age" },
    { label: "Gender", field: "gender" },
    { label: "Department", field: "department" },
    { label: "Outcome", field: "outcome" },
    { label: "Admission Date", field: "admission_date" },
  ];

  const filteredSortedPatients = useMemo(() => {
    const q = String(search || "")
      .trim()
      .toLowerCase();
    let filtered = (Array.isArray(data) ? data : []).filter((p) => {
      if (!q) return true;
      return (
        String(p.name || "")
          .toLowerCase()
          .includes(q) ||
        String(p.patient_id || "")
          .toLowerCase()
          .includes(q) ||
        String(p.department || "")
          .toLowerCase()
          .includes(q)
      );
    });

    if (sortField) {
      filtered = filtered.slice().sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === "admission_date") {
          aVal = aVal ? new Date(aVal) : new Date(0);
          bVal = bVal ? new Date(bVal) : new Date(0);
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortOrder === "asc"
          ? String(aVal || "").localeCompare(String(bVal || ""))
          : String(bVal || "").localeCompare(String(aVal || ""));
      });
    }

    return filtered;
  }, [search, sortField, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSortedPatients.length / rowsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedPatients = filteredSortedPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field)
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // --- REPORTS: centralized logic & state ---
  const [scheduledReports, setScheduledReports] = useState([]); // {id,name,filters,cron}
  const [reportHistory, setReportHistory] = useState([]); // {id,name,filters,generatedAt,rows}

  // Utility: normalize date to YYYY-MM-DD
  const toDay = (d) => {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toISOString().slice(0, 10);
  };

  // Aggregate admissions (simple, client-side)
  // filters: { startDate, endDate, department, granularity } granularity = 'day'|'month'
  const generateReport = ({
    startDate,
    endDate,
    department,
    granularity = "day",
  } = {}) => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const rows = (Array.isArray(data) ? data : []).filter((p) => {
      const ad = p.admission_date ? new Date(p.admission_date) : null;
      if (!ad) return false;
      if (start && ad < start) return false;
      if (end && ad > new Date(end.getTime() + 24 * 3600 * 1000 - 1))
        return false; // inclusive
      if (department && department !== "all" && p.department !== department)
        return false;
      return true;
    });

    // group by key
    const groups = {};
    rows.forEach((r) => {
      const d = new Date(r.admission_date);
      let key;
      if (granularity === "month") {
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      } else {
        key = toDay(d);
      }
      groups[key] = (groups[key] || 0) + 1;
    });

    // produce sorted series
    const keys = Object.keys(groups).sort();
    const series = keys.map((k) => ({ label: k, value: groups[k] }));

    // KPIs
    const kpis = {
      totalAdmissions: rows.length,
      uniquePatients: new Set(rows.map((r) => r.patient_id)).size,
      avgAdmissionsPerPeriod: keys.length
        ? Math.round(rows.length / keys.length)
        : 0,
    };

    return { rows, series, kpis };
  };

  // Export CSV - builds a file and triggers download
  const exportReportCSV = ({ rows = [], filename = "report.csv" } = {}) => {
    const headers = [
      "patient_id",
      "name",
      "age",
      "gender",
      "department",
      "outcome",
      "admission_date",
    ];
    const csv = [headers.join(",")]
      .concat(
        (rows || []).map((r) =>
          headers
            .map((h) => {
              const v = r[h] == null ? "" : String(r[h]).replace(/"/g, '""');
              return `"${v}"`;
            })
            .join(",")
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Schedule report (simple frontend scheduler)
  const scheduleReport = ({ name, filters }) => {
    const id = `sched_${Date.now()}`;
    const item = { id, name, filters, createdAt: new Date().toISOString() };
    setScheduledReports((s) => [item, ...s]);
    // also run once and save to history
    const result = generateReport(filters);
    const hist = {
      id: `run_${Date.now()}`,
      name,
      filters,
      generatedAt: new Date().toISOString(),
      rows: result.rows,
    };
    setReportHistory((h) => [hist, ...h]);
    return item;
  };

  // Run ad-hoc report and save history
  const runAdhocReport = (params) => {
    const result = generateReport(params);
    const hist = {
      id: `run_${Date.now()}`,
      name: `Ad-hoc ${new Date().toISOString()}`,
      filters: params,
      generatedAt: new Date().toISOString(),
      rows: result.rows,
      series: result.series,
      kpis: result.kpis,
    };
    setReportHistory((h) => [hist, ...h]);
    return result;
  };

  // Make list of departments for filters
  const departments = useMemo(() => {
    const set = new Set();
    (Array.isArray(data) ? data : []).forEach(
      (p) => p.department && set.add(p.department)
    );
    return ["all", ...Array.from(set)];
  }, []);

  // --- end reports logic ---

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <KPIcard />
                  <div className="grid grid-cols-2 gap-6 w-full mt-6">
                    <LineChart />
                    <BarChart />
                    <PieChart />
                    <BedOccupancyChart />
                  </div>
                </>
              }
            />
            <Route
              path="/patients"
              element={
                <PatientsPage
                  columns={columns}
                  search={search}
                  setSearch={setSearch}
                  patients={paginatedPatients}
                  handleSort={handleSort}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              }
            />

            <Route
              path="/reports"
              element={
                <ReportsPage
                  departments={departments}
                  runAdhocReport={runAdhocReport}
                  scheduleReport={scheduleReport}
                  scheduledReports={scheduledReports}
                  reportHistory={reportHistory}
                  exportReportCSV={exportReportCSV}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
