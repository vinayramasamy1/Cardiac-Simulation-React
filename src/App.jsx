import React from "react";
import { Routes, Route } from "react-router-dom";
import Shell from "./layout/Shell.jsx";

import Home from "./pages/Home.jsx";
import Rhythms from "./pages/Rhythms.jsx";
import Sim from "./pages/Sim.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import Reviews from "./pages/Reviews.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rhythms" element={<Rhythms />} />
        <Route path="/sim/:id" element={<Sim />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:category" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}