import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, BarChart3, Activity } from "lucide-react"; // icons
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/" },
    { title: "Patients", icon: <Users size={20} />, path: "/patients" }, // changed to lowercase absolute path
    { title: "Reports", icon: <BarChart3 size={20} />, path: "/reports" }, // changed to lowercase absolute path
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 200 : 60 }}
      className="bg-white shadow-lg min-h-screen p-3 pt-6 relative transition-all"
      role="navigation"
      aria-label="Main sidebar"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-blue-500 text-white p-1 rounded-full"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Logo / Title */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <span className="text-blue-600 font-bold text-lg">🏥</span>
        {isOpen && <h1 className="text-xl font-bold">HealthCare</h1>}
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.path}
              title={menu.title}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-blue-100 text-gray-700 ${
                  isActive ? "bg-blue-50 text-blue-600 font-semibold" : ""
                }`
              }
            >
              {menu.icon}
              {isOpen && <span>{menu.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
