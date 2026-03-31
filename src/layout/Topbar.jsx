import React from "react";
import { NavLink } from "react-router-dom";

function linkClass({ isActive }) {
  // Your CSS doesn’t have a built-in "active" topnav class, so keep it simple
  return `topnav__link${isActive ? " topnav__pill" : ""}`;
}

export default function Topbar() {
  return (
    <header className="topbar">
      <NavLink className="brand" to="/">
        <img className="brand__logo" src="/assets/logo.svg" alt="Cardiac Simulator" />
        <div className="brand__stack">
          <div className="brand__title">Scottsdale Fire Dept.</div>
          <div className="brand__subtitle">Cardiac Simulator Learning Tool</div>
        </div>
      </NavLink>

      <nav className="topnav" aria-label="Top navigation">
        <NavLink className={linkClass} to="/" end>
          Home
        </NavLink>
        <NavLink className={linkClass} to="/rhythms">
          Rhythms
        </NavLink>
        <NavLink className={linkClass} to="/ekg-waveforms">
          EKG Waveforms
        </NavLink>
        <NavLink className={linkClass} to="/case-studies">
          Case Studies
        </NavLink>
        <NavLink className={linkClass} to="/reviews">
          Reviews
        </NavLink>
      </nav>
    </header>
  );
}
