import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RHYTHMS } from "../data/rhythms.js";
import { RHYTHM_VIDEO_PATHS } from "../data/rhythmVideos.js";
import ECGWaveform from "../components/ECGWaveform.jsx";
import RhythmEducationTabs from "../components/RhythmEducationTabs.jsx";

const SPEED_OPTIONS = [1, 0.75, 0.5, 0.25];
const WAVEFORM_SPEED_OPTIONS = [0.5, 1, 1.5, 2];

function formatBpm(bpm) {
  if (!bpm) return "--";
  if (bpm.type === "unstable") return "Chaotic";
  if (bpm.type === "range") return `${bpm.min}-${bpm.max} BPM`;
  return `${bpm.value} BPM`;
}

function SimulatorWaveform({ rhythm }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  function resetWaveform() {
    setIsPlaying(true);
    setSpeed(1);
    setResetKey((key) => key + 1);
  }

  return (
    <aside className="sim-waveform-panel" aria-label={`${rhythm.name} EKG waveform`}>
      <div className="sim-waveform-panel__head">
        <div>
          <div className="sim-waveform-panel__eyebrow">EKG Waveform</div>
          <h2 className="sim-waveform-panel__title">{rhythm.name}</h2>
        </div>
        <div className="sim-waveform-panel__readout">
          <span>{rhythm.tag}</span>
          <strong>{formatBpm(rhythm.bpm)}</strong>
        </div>
      </div>

      <div className="sim-waveform-panel__display">
        <ECGWaveform
          key={resetKey}
          rhythmId={rhythm.id}
          isPlaying={isPlaying}
          speed={speed}
          height={300}
        />
      </div>

      <div className="sim-waveform-controls" aria-label="Waveform controls">
        <button
          type="button"
          className={`sim-waveform-control ${isPlaying ? "sim-waveform-control--active" : ""}`}
          onClick={() => setIsPlaying(true)}
          disabled={isPlaying}
        >
          Play
        </button>
        <button
          type="button"
          className={`sim-waveform-control ${!isPlaying ? "sim-waveform-control--active" : ""}`}
          onClick={() => setIsPlaying(false)}
          disabled={!isPlaying}
        >
          Pause
        </button>
        <label className="sim-waveform-speed">
          <span>Speed</span>
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
            {WAVEFORM_SPEED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}x
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="sim-waveform-control" onClick={resetWaveform}>
          Reset
        </button>
      </div>
    </aside>
  );
}

export default function Sim() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const rhythm = useMemo(() => RHYTHMS.find((x) => x.id === id), [id]);
  const videoSrc = RHYTHM_VIDEO_PATHS[rhythm?.id];

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

      <div className="sim-media-grid">
        <div className="canvas sim-video-panel" aria-label="Rhythm animation area">
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

        <SimulatorWaveform key={rhythm.id} rhythm={rhythm} />
      </div>

      <RhythmEducationTabs
        key={rhythm.id}
        rhythmId={rhythm.id}
        rhythmName={rhythm.name}
      />
    </section>
  );
}
