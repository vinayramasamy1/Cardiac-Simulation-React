// src/pages/CaseStudies.jsx
import React, { useMemo, useState } from "react";
import { RHYTHMS } from "../data/rhythms.js";

function rhythmToPdfPath(rhythmId) {
  return `/assets/case-studies/${rhythmId}.pdf`;
}

export default function CaseStudies() {
  // Build 8 case buttons from your 8 rhythms (same order as RHYTHMS)
  const cases = useMemo(() => {
    return RHYTHMS.map((r, idx) => ({
      id: r.id,
      title: `Case Study ${idx + 1}`,
      rhythmName: r.name,
      meta: `#${idx + 1} • ${r.tag}`,
      pdf: rhythmToPdfPath(r.id),
    }));
  }, []);

  const [collapsed, setCollapsed] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = cases[activeIndex];

  return (
    <div className={`cs-app ${collapsed ? "cs-collapsed" : ""}`}>
      {/* Top bar: title only (no redundant buttons) */}
      <header className="cs-topbar">
        <div className="cs-top-title">Case Studies</div>
      </header>

      <div className="cs-layout">
        {/* LEFT */}
        <aside className="cs-left" aria-label="Case study list">
          <div className="cs-left-title">Case Studies</div>

          <div className="cs-list" role="list" aria-label="Case study list">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                className={`cs-item ${idx === activeIndex ? "active" : ""}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-pressed={idx === activeIndex}
                title={c.rhythmName}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Only sidebar collapse control (no Go Home) */}
          <div className="cs-quick">
            <button className="cs-btn" type="button" onClick={() => setCollapsed((v) => !v)}>
              {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </button>
          </div>
        </aside>

        {/* CENTER */}
        <main className="cs-center">
          <div className="cs-title-row">
            <h2 className="cs-title">{active.title}</h2>
            <div className="cs-meta">{active.meta}</div>
          </div>

          {/* The big “canvas” is the PDF viewer */}
          <div className="cs-view" role="region" aria-label="Case PDF viewer">
            <iframe
              title={`${active.title} PDF`}
              src={`${active.pdf}#zoom=page-width`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>

          <div style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
            Rhythm: <span style={{ color: "white" }}>{active.rhythmName}</span>
          </div>
        </main>

        {/* RIGHT */}
        <aside className="cs-right" aria-label="Case features">
          <div className="cs-feature">Patient History</div>
          <div className="cs-feature">Symptoms</div>
          <div className="cs-feature">Tools / Scans</div>
          <div className="cs-feature">Treatment</div>

          {/* Open PDF moved here (under Treatment) */}
          <a
            className="cs-btn"
            href={active.pdf}
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: "16px", textAlign: "center" }}
          >
            Open PDF
          </a>
        </aside>
      </div>
    </div>
  );
}