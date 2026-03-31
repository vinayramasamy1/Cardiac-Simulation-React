import React, { useState } from "react";
import ECGWaveform from "../components/ECGWaveform.jsx";
import { RHYTHMS } from "../data/rhythms.js";

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];

export default function EKGWaveforms() {
  const [selectedRhythmId, setSelectedRhythmId] = useState(RHYTHMS[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const selectedRhythm =
    RHYTHMS.find((rhythm) => rhythm.id === selectedRhythmId) || RHYTHMS[0];

  function handleSelectRhythm(rhythmId) {
    setSelectedRhythmId(rhythmId);
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
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 16,
        }}
      >
        <aside
          aria-label="Waveform rhythm list"
          style={{
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.32)",
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
            Rhythms
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                    textAlign: "left",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(90,34,49,0.55), rgba(125,49,71,0.35))"
                      : "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.92)",
                    padding: "12px 12px",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 0 0 1px rgba(125,49,71,0.2) inset"
                      : "none",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{rhythm.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}>
                    {rhythm.tag}
                  </div>
                </button>
              );
            })}
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
              flexWrap: "wrap",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
              paddingTop: 6,
            }}
          >
            <button
              type="button"
              className="sidebar__btn"
              style={{ width: "auto", marginTop: 0, paddingInline: 22 }}
              onClick={() => setIsPlaying(true)}
              disabled={isPlaying}
            >
              Play
            </button>

            <button
              type="button"
              className="sidebar__btn sidebar__btn--ghost"
              style={{ width: "auto", marginTop: 0, paddingInline: 22 }}
              onClick={() => setIsPlaying(false)}
              disabled={!isPlaying}
            >
              Pause
            </button>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "rgba(255,255,255,0.8)",
                fontSize: 14,
              }}
            >
              <span>Speed</span>
              <select
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  padding: "10px 12px",
                  font: "inherit",
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
    </section>
  );
}
