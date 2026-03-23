// src/pages/CaseStudies.jsx
import React, { useMemo, useState } from "react";
import { RHYTHMS } from "../data/rhythms.js";

function rhythmToScenarioPath(rhythmId) {
  return `/assets/casestudypngs/${rhythmId}-scenario.png`;
}

function rhythmToTreatmentPath(rhythmId) {
  return `/assets/casestudypngs/${rhythmId}-treatment.png`;
}

export default function CaseStudies() {
  const cases = useMemo(() => {
    return RHYTHMS.map((r, idx) => ({
      id: r.id,
      title: `Case Study ${idx + 1}`,
      rhythmName: r.name,
      meta: `#${idx + 1} • ${r.tag}`,
      scenarioImage: rhythmToScenarioPath(r.id),
      treatmentImage: rhythmToTreatmentPath(r.id),
    }));
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lockedView, setLockedView] = useState(null);
  const [hoveredView, setHoveredView] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const active = cases[activeIndex];

  const markImageLoaded = (src, isLoaded) => {
    setLoadedImages((prev) => {
      if (prev[src] === isLoaded) return prev;
      return { ...prev, [src]: isLoaded };
    });
  };

  const hasScenarioImage = loadedImages[active.scenarioImage] === true;
  const hasTreatmentImage = loadedImages[active.treatmentImage] === true;

  const defaultView = hasScenarioImage ? "scenario" : "treatment";
  const resolvedView = hoveredView || lockedView || defaultView;

  const handleCaseChange = (idx) => {
    setActiveIndex(idx);
    setLockedView(null);
    setHoveredView(null);
  };

  const renderCanvasContent = () => {
    if (resolvedView === "scenario") {
      if (hasScenarioImage) {
        return (
          <div className="cs-view-content">
            <div className="cs-media-wrap">
              <img
                className="cs-media-image"
                src={active.scenarioImage}
                alt={`${active.rhythmName} patient scenario`}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="cs-view-content">
          <div className="cs-view-placeholder">
            Add this file to enable Patient Scenario:
            <span>{active.scenarioImage}</span>
          </div>
        </div>
      );
    }

    if (resolvedView === "treatment") {
      if (hasTreatmentImage) {
        return (
          <div className="cs-view-content">
            <div className="cs-media-wrap">
              <img
                className="cs-media-image"
                src={active.treatmentImage}
                alt={`${active.rhythmName} treatment visualization`}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="cs-view-content">
          <div className="cs-view-placeholder">
            Add this file to enable Treatment:
            <span>{active.treatmentImage}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="cs-view-content">
        <div className="cs-view-placeholder">Select a section to begin</div>
      </div>
    );
  };

  return (
    <div className={`cs-app ${collapsed ? "cs-collapsed" : ""}`}>
      {cases.map((c) => (
        <div key={c.id} style={{ display: "none" }}>
          <img
            src={c.scenarioImage}
            alt=""
            onLoad={() => markImageLoaded(c.scenarioImage, true)}
            onError={() => markImageLoaded(c.scenarioImage, false)}
          />
          <img
            src={c.treatmentImage}
            alt=""
            onLoad={() => markImageLoaded(c.treatmentImage, true)}
            onError={() => markImageLoaded(c.treatmentImage, false)}
          />
        </div>
      ))}

      <header className="cs-topbar">
        <div className="cs-top-title">Case Studies</div>
      </header>

      <div className="cs-layout">
        <aside className="cs-left" aria-label="Case study list">
          <div className="cs-left-title">Case Studies</div>

          <div className="cs-list" role="list" aria-label="Case study list">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                className={`cs-item ${idx === activeIndex ? "active" : ""}`}
                type="button"
                onClick={() => handleCaseChange(idx)}
                aria-pressed={idx === activeIndex}
                title={c.rhythmName}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="cs-quick">
            <button
              className="cs-btn"
              type="button"
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </button>
          </div>
        </aside>

        <main className="cs-center">
          <div className="cs-title-row">
            <h2 className="cs-title">{active.title}</h2>
            <div className="cs-meta">{active.meta}</div>
          </div>

          <div className="cs-view" role="region" aria-label="Case study viewer">
            {renderCanvasContent()}
          </div>

          <div className="cs-rhythm-line">
            Rhythm: <span>{active.rhythmName}</span>
          </div>
        </main>

        <aside className="cs-right" aria-label="Case features">
          <button
            type="button"
            className={`cs-feature-btn ${resolvedView === "scenario" ? "active" : ""}`}
            onMouseEnter={() => setHoveredView("scenario")}
            onMouseLeave={() => setHoveredView(null)}
            onClick={() => setLockedView("scenario")}
          >
            Patient Scenario
          </button>

          <button
            type="button"
            className={`cs-feature-btn ${resolvedView === "treatment" ? "active" : ""}`}
            onMouseEnter={() => setHoveredView("treatment")}
            onMouseLeave={() => setHoveredView(null)}
            onClick={() => setLockedView("treatment")}
          >
            Treatment
          </button>
        </aside>
      </div>
    </div>
  );
}