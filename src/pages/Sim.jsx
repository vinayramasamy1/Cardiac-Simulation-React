import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { RHYTHMS } from "../data/rhythms.js";

export default function Sim() {
  const { id } = useParams();

  const rhythm = useMemo(() => RHYTHMS.find((x) => x.id === id), [id]);

  // Only show the MP4 in Normal Sinus Rhythm
  const isNSR = useMemo(() => {
    if (!rhythm) return false;

    const rid = String(rhythm.id || "").trim().toUpperCase();
    const rtag = String(rhythm.tag || "").trim().toUpperCase();
    const rname = String(rhythm.name || "").trim().toLowerCase();

    return (
      rid === "NSR" ||
      rtag === "NSR" ||
      rname.includes("normal sinus")
    );
  }, [rhythm]);

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
          {isNSR ? (
            <>
              <video
                className="canvas__video"
                src="/videos/nsr.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="canvas__label">NSR Animation</div>
            </>
          ) : (
            <div className="canvas__placeholder">
              <div>
                <strong>Animation / 3D Area (placeholder)</strong>
                <br />
                Drop in Blender renders, a WebGL viewer (GLB), or a rhythm animation later.
                <br />
                This layout is already sized and styled for it.
              </div>
            </div>
          )}
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