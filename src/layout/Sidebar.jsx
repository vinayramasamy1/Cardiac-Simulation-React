import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ rhythms, activeId, collapsed, onToggleCollapsed }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="sidebar__section">
        <div className="sidebar__label">Rhythms</div>

        <div className="sidebar__list" id="sidebar-list">
          {rhythms.map((r) => (
            <Link
              key={r.id}
              className={`sideitem ${activeId === r.id ? "sideitem--active" : ""}`}
              to={`/sim/${encodeURIComponent(r.id)}`}
              data-id={r.id}
            >
              <div className="sideitem__name">{r.name}</div>
              <div className="sideitem__tag">{r.tag}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__label">Quick tools</div>
        <button className="sidebar__btn" type="button" onClick={() => navigate("/")}>
          Go Home
        </button>
        <button
          className="sidebar__btn sidebar__btn--ghost"
          type="button"
          onClick={onToggleCollapsed}
        >
          {collapsed ? "Expand sidebar" : "Collapse sidebar"}
        </button>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__tiny">Design Layout Prototype</div>
      </div>
    </aside>
  );
}
