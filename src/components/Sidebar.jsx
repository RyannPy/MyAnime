import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/authServices";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      // Home/grid dashboard icon
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5ZM4 14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8Z"
        />
      </svg>
    ),
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    href: "#",
    icon: (
      // Trophy/ranking icon
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6m0 0v4m-3 0h6m-5-16h4a1 1 0 0 1 1 1v3H7V4a1 1 0 0 1 1-1Z"
        />
      </svg>
    ),
  },
  {
    id: "list",
    label: "Anime List",
    href: "#",
    icon: (
      // List/bookmark icon
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2m-4-1v8l-2-2-2 2V3h4Zm-4 9h4m-4 4h8M8 7h1"
        />
      </svg>
    ),
  },
  {
    id: "history",
    label: "History",
    href: "#",
    icon: (
      // Clock/history icon
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "#",
    icon: (
      // Bar chart analytics icon
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 15v4m6-6v6m6-4v4m6-12v12M3 11l6-3 6 4 5.5-7"
        />
      </svg>
    ),
  }
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await signOut();
    if (result?.error) {
      console.error("Logout failed:", result.error);
      return;
    }
    navigate("/");
  };

  const handleNav = (item) => {
    setActiveItem(item.id);
    setMobileOpen(false);
    if (item.id === "dashboard") {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-blue-900/20 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile hamburger button ── */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Open sidebar"
        className="
          fixed top-4 left-4 z-50 p-2 rounded-xl
          bg-white border border-blue-100 shadow-md
          text-blue-600 hover:bg-blue-50 hover:text-blue-700
          transition-all duration-200
          sm:hidden
        "
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>

      {/* ── Sidebar panel ── */}
      <aside
        id="main-sidebar"
        aria-label="Main navigation sidebar"
        className={`
          fixed top-0 left-0 z-40 h-full
          flex flex-col
          bg-white
          border-r border-blue-100
          shadow-[4px_0_24px_0_rgba(59,130,246,0.08)]
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-18" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        {/* ── Header / Brand ── */}
        <div
          className={`
            flex items-center gap-3 px-5 py-5
            border-b border-blue-50
            ${collapsed ? "justify-center px-0" : ""}
          `}
        >
          {/* Logo mark */}
          <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>

          {/* Brand text */}
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="font-mono text-xl font-bold tracking-tight text-blue-700">
                MyAnime
              </span>
              <span className="font-mono text-[10px] font-medium text-blue-400 tracking-widest uppercase">
                My List of Anime
              </span>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p
            className={`
              font-mono text-[10px] font-semibold tracking-widest uppercase
              text-blue-300 mb-3 px-2
              transition-opacity duration-200
              ${collapsed ? "opacity-0 h-0 mb-0 overflow-hidden" : "opacity-100"}
            `}
          >
            Navigation
          </p>

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <li key={item.id} className="relative">
                  {/* Tooltip when collapsed */}
                  {collapsed && isHovered && (
                    <div
                      className="
                        absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50
                        px-3 py-1.5 rounded-lg
                        bg-blue-700 text-white
                        font-mono text-xs font-medium whitespace-nowrap
                        shadow-lg
                        pointer-events-none
                        animate-fade-in
                      "
                    >
                      {item.label}
                      {/* Arrow */}
                      <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-blue-700" />
                    </div>
                  )}

                  <a
                    href={item.href}
                    id={`nav-${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item);
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                      font-mono text-sm font-medium
                      transition-all duration-200 ease-in-out
                      group select-none
                      ${collapsed ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.4)]"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                      }
                    `}
                  >
                    {/* Active indicator bar */}
                    {isActive && !collapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/60 rounded-r-full" />
                    )}

                    {/* Icon */}
                    <span
                      className={`
                        shrink-0 transition-transform duration-200
                        ${isHovered && !isActive ? "scale-110" : "scale-100"}
                        ${isActive ? "text-white" : "text-blue-500 group-hover:text-blue-600"}
                      `}
                    >
                      {item.icon}
                    </span>

                    {/* Label */}
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {/* Active dot badge (right side) */}
                    {isActive && !collapsed && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Divider ── */}
        <div className="mx-4 border-t border-blue-50" />

        {/* ── User card ── */}
        <div
          className={`
            flex items-center gap-3 px-4 py-4
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <div className="shrink-0 w-9 h-9 rounded-xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-300 overflow-hidden">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z"
              />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm font-semibold text-slate-700 truncate">
                Guest User
              </p>
              <p className="font-mono text-[11px] text-blue-400 truncate">
                visitor@anitrack.app
              </p>
            </div>
          )}
        </div>

        {/* ── Logout button ── */}
        <div className="mx-3 mb-3">
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className={
              `w-full flex items-center gap-2 px-3 py-2 rounded-xl
              font-mono text-sm font-medium text-slate-500
              hover:bg-blue-50 hover:text-blue-600
              transition-all duration-200
              border border-blue-100
              ${collapsed ? "justify-center" : ""}`
            }
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12H3m7-4l-4 4 4 4m5-9v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"
              />
            </svg>
            {!collapsed && "Logout"}
          </button>
        </div>

        {/* ── Collapse toggle button ── */}
        <div className="mx-3 mb-3">
          <button
            type="button"
            id="sidebar-collapse-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`
              w-full flex items-center gap-2 px-3 py-2 rounded-xl
              font-mono text-xs font-medium text-slate-400
              hover:bg-blue-50 hover:text-blue-600
              transition-all duration-200
              border border-blue-100
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <svg
              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 7l-5 5 5 5M19 7l-5 5 5 5"
              />
            </svg>
            {!collapsed}
          </button>
        </div>
      </aside>

      {/* ── Main content offset ── */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${collapsed ? "sm:ml-18" : "sm:ml-64"}
        `}
      />
    </>
  );
}

export default Sidebar;
