import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page">
      <div className="home-center">
        <h1 className="home-title">Scottsdale Fire Dept.</h1>
        <p className="home-subtitle">Cardiac Simulator Learning Tool</p>

        <div className="home-tiles" role="list" aria-label="Main sections">
          <Link className="home-tile" to="/rhythms" role="listitem" aria-label="Open Rhythms">
            <div className="home-tile__box">
              <img className="home-tile__icon" src="/assets/icon-rhythms.svg" alt="" />
            </div>
            <div className="home-tile__label">Rhythms</div>
          </Link>

          <Link
            className="home-tile"
            to="/case-studies"
            role="listitem"
            aria-label="Open Case Studies"
          >
            <div className="home-tile__box">
              <img className="home-tile__icon" src="/assets/icon-case-studies.svg" alt="" />
            </div>
            <div className="home-tile__label">Case Studies</div>
          </Link>

          <Link className="home-tile" to="/reviews" role="listitem" aria-label="Open Reviews">
            <div className="home-tile__box">
              <img className="home-tile__icon" src="/assets/icon-reviews.svg" alt="" />
            </div>
            <div className="home-tile__label">Reviews</div>
          </Link>
        </div>
      </div>
    </section>
  );
}

