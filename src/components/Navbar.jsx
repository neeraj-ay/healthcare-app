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
      {" "}
      {/* changed to blue */}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {/* Right: User Profile + Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Dr. Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
        <button className="px-3 py-1 bg-blue-400 text-white hover:bg-green-600 transition rounded ">
          Logout
        </button>
      </div>
    </header>
  );
}
