import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { RHYTHMS } from "../data/rhythms.js";

export default function Shell({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const activeRhythmId = useMemo(() => {
    const match = location.pathname.match(/^\/sim\/([^/]+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  }, [location.pathname]);

  return (
    <div className={`app ${collapsed ? "app--collapsed" : ""}`}>
      <Topbar />

      <div className="body">
        <Sidebar
          rhythms={RHYTHMS}
          activeId={activeRhythmId}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
        />

        <main className="main" id="app-root" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
