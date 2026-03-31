import React, { useState } from "react";
import ECGWaveform from "../components/ECGWaveform.jsx";
import { RHYTHMS } from "../data/rhythms.js";

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];
const RHYTHM_DETAILS = {
  "normal-sinus": [
    "Regular rhythm with an even beat-to-beat spacing",
    "Visible P wave before each narrow QRS complex",
    "Steady baseline with a normal-appearing T wave",
  ],
  "atrial-fibrillation": [
    "Irregularly irregular spacing between beats",
    "No consistent P waves before the QRS complexes",
    "Fine baseline activity between narrow complexes",
  ],
  "ventricular-fibrillation": [
    "Chaotic waveform with no organized QRS complexes",
    "No clear baseline or repeating pattern",
    "Amplitude varies continuously across the strip",
  ],
  "atrial-flutter": [
    "Sawtooth flutter waves between ventricular beats",
    "More regular than atrial fibrillation",
    "Narrow QRS complexes can still appear at intervals",
  ],
  "sinus-tachycardia": [
    "Sinus pattern remains present but the rate is faster",
    "Shorter distance between repeating complexes",
    "P-QRS-T sequence is still organized and regular",
  ],
  "ventricular-tachycardia": [
    "Wide ventricular complexes dominate the strip",
    "Rapid, regular rhythm with little time between beats",
    "P waves are not clearly leading each complex",
  ],
  "supraventricular-tachycardia": [
    "Very rapid narrow-complex rhythm",
    "P waves are hard to see or may be hidden",
    "Regular pattern with minimal spacing between beats",
  ],
  wpw: [
    "Short PR appearance with a slurred upstroke feel",
    "Accessory pathway changes the early ventricular activation",
    "QRS onset looks broader than a typical sinus beat",
  ],
};

function panelShellStyle(width, isCollapsed) {
  return {
    width,
    minWidth: width,
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 16px 36px rgba(0,0,0,0.32)",
    padding: isCollapsed ? 12 : 14,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflow: "hidden",
    transition: "width 220ms ease, min-width 220ms ease, padding 220ms ease",
    flexShrink: 0,
  };
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 3.2 L10.4 7 L4 10.8 Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3.2" y="3" width="2.6" height="8" rx="1" fill="currentColor" />
      <rect x="8.2" y="3" width="2.6" height="8" rx="1" fill="currentColor" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 9.5 A4.5 4.5 0 1 1 11.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 7 L9.8 5.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function EKGWaveforms() {
  const [selectedRhythmId, setSelectedRhythmId] = useState(RHYTHMS[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  const selectedRhythm =
    RHYTHMS.find((rhythm) => rhythm.id === selectedRhythmId) || RHYTHMS[0];
  const selectedRhythmDetails = RHYTHM_DETAILS[selectedRhythm?.id] || [];

  function handleSelectRhythm(rhythmId) {
    setSelectedRhythmId(rhythmId);
    setIsPlaying(true);
    setSpeed(1);
  }

  return (
    <section className="page">
      <div className="hero">
        <h1 className="hero__title">EKG Waveforms</h1>
        <p className="hero__sub">
          Choose a rhythm from the sidebar to view its animated waveform and adjust playback.
        </p>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <aside
          aria-label="Waveform rhythm list"
          style={panelShellStyle(leftCollapsed ? 96 : 200, leftCollapsed)}
        >
          {!leftCollapsed ? (
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Rhythms
            </div>
          ) : (
            <div
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              List
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: leftCollapsed ? 10 : 8,
              paddingTop: 4,
              flex: 1,
            }}
          >
            {RHYTHMS.map((rhythm) => {
              const isSelected = rhythm.id === selectedRhythm?.id;

              return (
                <button
                  key={rhythm.id}
                  type="button"
                  onClick={() => handleSelectRhythm(rhythm.id)}
                  aria-pressed={isSelected}
                  style={{
                    width: "100%",
                    textAlign: leftCollapsed ? "center" : "left",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(90,34,49,0.55), rgba(125,49,71,0.35))"
                      : "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.92)",
                    padding: leftCollapsed ? "12px 10px" : "12px 12px",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 0 0 1px rgba(125,49,71,0.2) inset"
                      : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: leftCollapsed ? 44 : "auto",
                  }}
                >
                  {leftCollapsed ? (
                    <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.1 }}>{rhythm.tag}</div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <div style={{ fontWeight: 700 }}>{rhythm.name}</div>
                      <div
                        style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}
                      >
                        {rhythm.tag}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              type="button"
              className="sidebar__btn sidebar__btn--ghost"
              style={{
                width: "100%",
                marginTop: 0,
                padding: leftCollapsed ? "10px 8px" : "10px 12px",
                whiteSpace: "nowrap",
              }}
              onClick={() => setLeftCollapsed((value) => !value)}
            >
              {leftCollapsed ? "Expand" : "Collapse"}
            </button>
          </div>
        </aside>

        <div
          style={{
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.10)",
            background:
              "radial-gradient(900px 500px at 20% 20%, rgba(125,49,71,0.20), transparent 55%), rgba(255,255,255,0.04)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            padding: 22,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flex: 1,
            minWidth: 0,
            transition: "flex-basis 220ms ease, width 220ms ease",
          }}
        >
          <div className="sim-head">
            <div>
              <h2 className="sim-title">{selectedRhythm?.name}</h2>
              <div className="sim-meta">{selectedRhythm?.description}</div>
            </div>
            <div className="badge">Waveform • {selectedRhythm?.tag}</div>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: 900 }}>
              <ECGWaveform
                rhythmId={selectedRhythm?.id}
                isPlaying={isPlaying}
                speed={speed}
                height={360}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                width: "100%",
                maxWidth: 620,
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.10)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.03), 0 14px 28px rgba(0,0,0,0.22)",
                padding: "16px 18px",
              }}
            >
              <button
                type="button"
                className="sidebar__btn"
                style={{
                  width: "auto",
                  marginTop: 0,
                  padding: "12px 22px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: isPlaying
                    ? "linear-gradient(135deg, rgba(64,201,128,0.3), rgba(126,240,165,0.2))"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: isPlaying
                    ? "0 0 0 1px rgba(126,240,165,0.18) inset, 0 10px 24px rgba(64,201,128,0.18)"
                    : "none",
                  borderColor: isPlaying
                    ? "rgba(126,240,165,0.34)"
                    : "rgba(255,255,255,0.14)",
                  color: isPlaying ? "#7ef0a5" : "rgba(255,255,255,0.88)",
                }}
                onClick={() => setIsPlaying(true)}
                disabled={isPlaying}
              >
                <PlayIcon />
                <span>Play</span>
              </button>

              <button
                type="button"
                className="sidebar__btn sidebar__btn--ghost"
                style={{
                  width: "auto",
                  marginTop: 0,
                  padding: "12px 20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: !isPlaying
                    ? "linear-gradient(135deg, rgba(64,201,128,0.3), rgba(126,240,165,0.2))"
                    : "rgba(255,255,255,0.05)",
                  color: !isPlaying ? "#7ef0a5" : "rgba(255,255,255,0.88)",
                  borderColor: !isPlaying
                    ? "rgba(126,240,165,0.34)"
                    : "rgba(255,255,255,0.14)",
                  boxShadow: !isPlaying
                    ? "0 0 0 1px rgba(126,240,165,0.18) inset, 0 10px 24px rgba(64,201,128,0.18)"
                    : "none",
                }}
                onClick={() => setIsPlaying(false)}
                disabled={!isPlaying}
              >
                <PauseIcon />
                <span>Pause</span>
              </button>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "rgba(255,255,255,0.84)",
                  fontSize: 14,
                  padding: "12px 14px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.14)",
                }}
              >
                <SpeedIcon />
                <span>Speed</span>
                <select
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.92)",
                    padding: "10px 12px",
                    font: "inherit",
                    minWidth: 82,
                  }}
                >
                  {SPEED_OPTIONS.map((option) => (
                    <option key={option} value={option} style={{ color: "#111" }}>
                      {option}x
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <aside
          aria-label="Rhythm information"
          style={panelShellStyle(rightCollapsed ? 96 : 260, rightCollapsed)}
        >
          {!rightCollapsed ? (
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Rhythm Info
            </div>
          ) : (
            <div
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Info
            </div>
          )}

          <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: 4 }}>
            {rightCollapsed ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                <div className="badge" style={{ paddingInline: 10 }}>
                  {selectedRhythm?.tag}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5 }}>{selectedRhythm?.name}</div>
              </div>
            ) : (
              <>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>
                    {selectedRhythm?.name}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.6,
                      fontSize: 14,
                    }}
                  >
                    {selectedRhythm?.description}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.18)",
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      marginBottom: 10,
                    }}
                  >
                    Key Characteristics
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {selectedRhythmDetails.map((detail) => (
                      <div
                        key={detail}
                        style={{
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "10px 12px",
                          color: "rgba(255,255,255,0.84)",
                          lineHeight: 1.5,
                          fontSize: 13,
                        }}
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              type="button"
              className="sidebar__btn sidebar__btn--ghost"
              style={{
                width: "100%",
                marginTop: 0,
                padding: rightCollapsed ? "10px 8px" : "10px 12px",
                whiteSpace: "nowrap",
              }}
              onClick={() => setRightCollapsed((value) => !value)}
            >
              {rightCollapsed ? "Expand" : "Collapse"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
