import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/patients": "Patients",
    "/reports": "Reports",
  };

  const title = pageTitles[location.pathname] || "HealthCare";

  return (
    <header className="bg-blue-600 text-white shadow-sm p-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline">Dr. Admin</span>
        <button className="bg-white bg-opacity-10 px-3 py-1 rounded text-white">
          Logout
        </button>
      </div>
    </header>
  );
}
