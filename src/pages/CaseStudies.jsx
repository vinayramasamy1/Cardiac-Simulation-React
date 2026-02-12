import React, { useMemo, useState } from "react";

function buildCases() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `case-${i + 1}`,
    title: `Case Study ${i + 1}`,
    meta: `#${i + 1} • Unassigned`,
    content: "",
  }));
}

export default function CaseStudies() {
  const initialCases = useMemo(() => buildCases(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cases, setCases] = useState(initialCases);

  const active = cases[activeIndex];

  function setActive(idx) {
    const clamped = Math.max(0, Math.min(cases.length - 1, idx));
    setActiveIndex(clamped);
  }

  function updateContent(nextText) {
    setCases((prev) => {
      const copy = prev.slice();
      copy[activeIndex] = { ...copy[activeIndex], content: nextText };
      return copy;
    });
  }

  return (
    <div className="cs-app">
      <div className="cs-layout">
        {/* LEFT: Case list (keep) */}
        <aside className="cs-left" aria-label="Case study list">
          <div className="cs-left-title">Case Studies</div>

          <div className="cs-list" role="list" aria-label="Case study list">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                className={`cs-item ${idx === activeIndex ? "active" : ""}`}
                type="button"
                onClick={() => setActive(idx)}
                aria-pressed={idx === activeIndex}
              >
                {c.title}
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER */}
        <main className="cs-center">
          <div className="cs-title-row">
            <h2 className="cs-title">{active.title}</h2>
            <div className="cs-meta">{active.meta}</div>
          </div>

          <div className="cs-view" role="region" aria-label="Viewing window">
            <div className="placeholder">
              {active.title} — Large viewing window (placeholder)
              <br />
              Add images, strips, vitals panels, or 3D here.
            </div>
          </div>

          <div>
            <label className="cs-desc-label">Condition overview / description</label>
            <textarea
              className="cs-desc"
              value={active.content}
              onChange={(e) => updateContent(e.target.value)}
              placeholder="Type your case description here..."
            />
          </div>
        </main>

        {/* RIGHT */}
        <aside className="cs-right" aria-label="Case features">
          <div className="cs-feature">Patient History</div>
          <div className="cs-feature">Symptoms</div>
          <div className="cs-feature">Tools / Scans</div>
          <div className="cs-feature">Treatment</div>
        </aside>
      </div>
    </div>
  );
}
