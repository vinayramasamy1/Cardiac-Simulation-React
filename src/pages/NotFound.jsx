import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page">
      <div className="hero">
        <h1 className="hero__title">Page not found</h1>
        <p className="hero__sub">
          Go back to <Link to="/">Home</Link>.
        </p>
      </div>
    </section>
  );
}
