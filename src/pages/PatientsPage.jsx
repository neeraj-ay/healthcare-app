import React from "react";
import SortingHeader from "../components/patientsComponents/SortingHeader";
import Patients from "../components/patientsComponents/Patients";
import Pagination from "../components/patientsComponents/Pagination";

export default function PatientsPage({
  columns,
  search,
  setSearch,
  patients,
  handleSort,
  sortField,
  sortOrder,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, id or department"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md w-full max-w-md"
            aria-label="Search patients"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-full divide-y divide-gray-200">
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
              <Patients patients={patients} />
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </main>
  );
}
