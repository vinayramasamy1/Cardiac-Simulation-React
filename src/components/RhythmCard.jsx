import React from "react";
import { Link } from "react-router-dom";

export default function RhythmCard({ rhythm }) {
  return (
    <Link className="card" to={`/sim/${encodeURIComponent(rhythm.id)}`}>
      <div className="card__thumb">
        <img src={rhythm.image} alt={`${rhythm.name} ECG`} />
      </div>
      <div className="card__body">
        <div className="card__title">{rhythm.name}</div>
        <div className="card__desc">{rhythm.description}</div>
      </div>
    </Link>
  );
}
