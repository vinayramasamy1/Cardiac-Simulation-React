import React, { useState } from "react";
import { RHYTHM_EDUCATION } from "../data/rhythmEducation.js";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "ecgCharacteristics", label: "ECG Characteristics" },
  { id: "clinicalNotes", label: "Clinical Notes" },
  { id: "keyTakeaways", label: "Key Takeaways" },
];

function PointList({ items }) {
  return (
    <ul className="rhythm-education__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function RhythmEducationTabs({ rhythmId, rhythmName }) {
  const [activeTab, setActiveTab] = useState("overview");
  const education = RHYTHM_EDUCATION[rhythmId];

  if (!education) return null;

  return (
    <section className="rhythm-education" aria-labelledby="rhythm-education-title">
      <div className="rhythm-education__heading">
        <div>
          <div className="rhythm-education__eyebrow">Study Guide</div>
          <h2 id="rhythm-education-title">Learn {rhythmName}</h2>
        </div>
      </div>

      <div className="rhythm-education__tabs" role="tablist" aria-label="Rhythm education topics">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`education-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`education-panel-${tab.id}`}
            className={`rhythm-education__tab ${
              activeTab === tab.id ? "rhythm-education__tab--active" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`education-panel-${activeTab}`}
        className="rhythm-education__content"
        role="tabpanel"
        aria-labelledby={`education-tab-${activeTab}`}
      >
        {activeTab === "overview" ? (
          <div className="rhythm-education__overview">
            {education.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {activeTab === "ecgCharacteristics" ? (
          <dl className="rhythm-education__characteristics">
            {education.ecgCharacteristics.map((item) => (
              <div className="rhythm-education__characteristic" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {activeTab === "clinicalNotes" ? <PointList items={education.clinicalNotes} /> : null}
        {activeTab === "keyTakeaways" ? <PointList items={education.keyTakeaways} /> : null}
      </div>
    </section>
  );
}
