import { useState, useMemo, useEffect } from "react";
import data from "../data/patients.json";
import Patients from "../components/patientsComponents/Patients";
import SortingHeader from "../components/patientsComponents/SortingHeader";
import Pagination from "../components/patientsComponents/Pagination";

export default function PatientsPage() {
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
    const q = search.trim().toLowerCase();
    let filtered = data.filter((p) => {
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

        // Date compare for admission_date
        if (sortField === "admission_date") {
          aVal = aVal ? new Date(aVal) : new Date(0);
          bVal = bVal ? new Date(bVal) : new Date(0);
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        // numeric compare
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        // fallback: string compare using localeCompare
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

  // clamp current page when filtered results change
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedPatients = filteredSortedPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      {/* center page and constrain width */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* card-style container */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, id or department"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-md"
            aria-label="Search patients"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-full divide-y divide-gray-200">
            {" "}
            {/* enforce fixed layout and full width */}
            {/* fixed column widths to keep header & body aligned */}
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <SortingHeader
              columns={columns}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <tbody className="bg-white divide-y divide-gray-100">
              <Patients patients={paginatedPatients} />
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </main>
  );
}
