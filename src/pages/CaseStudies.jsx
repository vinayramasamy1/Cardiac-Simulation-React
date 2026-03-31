// src/pages/CaseStudies.jsx
import React, { useMemo, useState } from "react";
import { RHYTHMS } from "../data/rhythms.js";

const SCENARIO_CONTENT = {
  "normal-sinus": {
    patientName: "Jordan Ellis",
    age: 34,
    situation:
      "The patient reports mild chest fluttering after a stressful shift but is alert, speaking clearly, and hemodynamically stable on arrival.",
    findings: [
      "Skin warm and dry with no respiratory distress",
      "Regular pulse and normal mentation",
      "No active chest pain at the time of assessment",
    ],
  },
  "atrial-fibrillation": {
    patientName: "Maria Lopez",
    age: 71,
    situation:
      "The patient describes sudden palpitations, fatigue, and mild shortness of breath that began earlier this morning while walking to the kitchen.",
    findings: [
      "Irregular pulse noted at the wrist",
      "Reports intermittent dizziness with exertion",
      "History of hypertension and prior episodes of AFib",
    ],
  },
  "ventricular-fibrillation": {
    patientName: "Thomas Reed",
    age: 58,
    situation:
      "Bystanders report the patient collapsed without warning. CPR is in progress on crew arrival and the patient is unresponsive.",
    findings: [
      "No palpable pulse",
      "Apneic and unresponsive",
      "Immediate defibrillation and resuscitation indicated",
    ],
  },
  "atrial-flutter": {
    patientName: "Avery Patel",
    age: 66,
    situation:
      "The patient complains of a racing heartbeat and mild chest pressure after climbing a flight of stairs, but remains awake and oriented.",
    findings: [
      "Rapid but organized rhythm appearance",
      "Mild shortness of breath during movement",
      "Blood pressure remains stable during initial assessment",
    ],
  },
  "sinus-tachycardia": {
    patientName: "Ethan Brooks",
    age: 27,
    situation:
      "The patient is anxious, febrile, and dehydrated after several hours of vomiting, with a fast pulse that increases further when standing.",
    findings: [
      "Regular rapid pulse",
      "Dry mucous membranes and delayed capillary refill",
      "Likely physiologic response to stress or dehydration",
    ],
  },
  "ventricular-tachycardia": {
    patientName: "Samuel Grant",
    age: 64,
    situation:
      "The patient reports severe palpitations and near-syncope while seated, with increasing weakness and a sense that he may pass out.",
    findings: [
      "Rapid wide-complex rhythm suspected",
      "Cool skin and reduced perfusion signs",
      "Mental status beginning to decline with ongoing symptoms",
    ],
  },
  "supraventricular-tachycardia": {
    patientName: "Chloe Nguyen",
    age: 22,
    situation:
      "The patient developed a sudden racing heartbeat during exercise and says the sensation started abruptly and has not stopped.",
    findings: [
      "Very rapid regular pulse",
      "No obvious chest trauma or fever",
      "Patient is anxious but still alert and responsive",
    ],
  },
  wpw: {
    patientName: "Dylan Foster",
    age: 19,
    situation:
      "The patient has a history of episodic palpitations and presents after a sudden onset of rapid heartbeat during basketball practice.",
    findings: [
      "Young patient with recurrent tachyarrhythmia symptoms",
      "Episodes begin and end suddenly",
      "Accessory pathway pattern is a key teaching consideration",
    ],
  },
};

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
      const scenario = SCENARIO_CONTENT[active.id];

      return (
        <div className="cs-view-content">
          <div className="cs-scenario-board">
            <div className="cs-scenario-card cs-scenario-card--title">
              <div className="cs-scenario-section-label">Rhythm</div>
              <h3 className="cs-scenario-rhythm">{active.rhythmName}</h3>
              <div className="cs-scenario-tag">{active.meta}</div>
            </div>

            <div className="cs-scenario-grid">
              <div className="cs-scenario-card">
                <div className="cs-scenario-section-label">Patient Information</div>
                <div className="cs-scenario-info-row">
                  <span>Name</span>
                  <strong>{scenario.patientName}</strong>
                </div>
                <div className="cs-scenario-info-row">
                  <span>Age</span>
                  <strong>{scenario.age} years</strong>
                </div>
              </div>

              <div className="cs-scenario-card">
                <div className="cs-scenario-section-label">Situation</div>
                <p className="cs-scenario-copy">{scenario.situation}</p>
              </div>
            </div>

            <div className="cs-scenario-card cs-scenario-card--fill">
              <div className="cs-scenario-section-label">Key Findings</div>
              <ul className="cs-scenario-list">
                {scenario.findings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
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
