import React, { useState, useMemo, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default React.memo(function Sidebar() {
  // load persisted collapsed state (default: expanded)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("hc_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  // persist collapsed state
  useEffect(() => {
    try {
      localStorage.setItem(
        "hc_sidebar_collapsed",
        collapsed ? "true" : "false"
      );
    } catch {}
  }, [collapsed]);

  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  // memoize menu list to avoid re-creating on renders
  const menus = useMemo(
    () => [
      { title: "Dashboard", icon: "🏠", path: "/" },
      { title: "Patients", icon: "👥", path: "/patients" },
      { title: "Reports", icon: "📊", path: "/reports" },
    ],
    []
  );

  return (
    <aside
      className={`bg-white border-r min-h-screen p-3 transition-width duration-150 ease-in-out flex-shrink-0 ${
        collapsed ? "w-20" : "w-64"
      }`}
      role="navigation"
      aria-label="Main sidebar"
      aria-expanded={!collapsed}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          {!collapsed && <h1 className="text-lg font-bold">HealthCare</h1>}
        </div>

        {/* collapse toggle: use plain < and > characters */}
        <button
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-pressed={collapsed}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-semibold"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="mt-2">
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.title}>
              <NavLink
                to={menu.path}
                title={menu.title}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700"
                  } ${collapsed ? "justify-center" : ""}`
                }
                end
              >
                <span className="text-lg" aria-hidden="true">
                  {menu.icon}
                </span>
                {/* hide label when collapsed but keep it in DOM for screen readers */}
                <span className={`${collapsed ? "sr-only" : ""} select-none`}>
                  {menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
});
