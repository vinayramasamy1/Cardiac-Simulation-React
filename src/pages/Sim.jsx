import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RHYTHMS } from "../data/rhythms.js";

const SPEED_OPTIONS = [1, 0.75, 0.5, 0.25];

export default function Sim() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const rhythm = useMemo(() => RHYTHMS.find((x) => x.id === id), [id]);
  const videoSrc = rhythm?.id === "atrial-fibrillation" ? "/videos/afib-test.mp4" : "/videos/test.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  if (!rhythm) {
    return (
      <section className="page">
        <div className="hero">
          <h1 className="hero__title">Not found</h1>
          <p className="hero__sub">
            That module doesn’t exist. Go back to <Link to="/">Home</Link>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="sim-head">
        <div>
          <h1 className="sim-title">{rhythm.name}</h1>
          <div className="sim-meta">{rhythm.description}</div>
        </div>
        <div className="badge">Module • {rhythm.tag}</div>
      </div>

      <div className="sim-grid">
        <div className="canvas" aria-label="Rhythm animation area">
          <>
            <video
              ref={videoRef}
              className="canvas__video"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = playbackRate;
              }}
            />
            <div className="canvas__label">{rhythm.tag} Animation</div>
            <label
              style={{
                position: "absolute",
                left: 14,
                top: 14,
                zIndex: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 999,
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span>Speed</span>
              <select
                value={playbackRate}
                onChange={(event) => setPlaybackRate(Number(event.target.value))}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.92)",
                  font: "inherit",
                  padding: "4px 8px",
                }}
              >
                {SPEED_OPTIONS.map((speed) => (
                  <option key={speed} value={speed} style={{ color: "#111" }}>
                    {speed === 1 ? "1.0" : speed}x
                  </option>
                ))}
              </select>
            </label>
          </>
        </div>

        <aside className="panel" aria-label="Module info panel">
          <div className="panel__head">Status</div>
          <div className="panel__body">
            <div className="kv">
              <span>View</span>
              <strong>Simulator</strong>
            </div>
            <div className="kv">
              <span>Rhythm</span>
              <strong>{rhythm.tag}</strong>
            </div>
            <div className="kv">
              <span>Controls</span>
              <strong>Coming soon</strong>
            </div>

            <div
              className="panel__head"
              style={{
                margin: "10px -14px 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Notes
            </div>

            <div style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.6, fontSize: 13 }}>
              Next upgrades you can plug in here:
              <ul style={{ margin: "10px 0 0 18px", padding: 0 }}>
                <li>Rate slider / conduction overlay toggles</li>
                <li>Medication scenarios + outcomes</li>
                <li>Hotspots for anatomical exploration</li>
                <li>3D heart (GLB) with guided labels</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
