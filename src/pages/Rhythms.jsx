import React from "react";
import { RHYTHMS } from "../data/rhythms.js";
import RhythmCard from "../components/RhythmCard.jsx";

export default function Rhythms() {
  return (
    <section className="page">
      <div className="hero">
        <h1 className="hero__title">Rhythms</h1>
        <p className="hero__sub">Select a rhythm to open the simulator module.</p>
      </div>

      <div className="grid" role="list" aria-label="Rhythm modules">
        {RHYTHMS.map((r) => (
          <RhythmCard key={r.id} rhythm={r} />
        ))}
      </div>
    </section>
  );
}
