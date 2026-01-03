import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import SectionRow from "../../Components/HeroCards/SectionRow/SectionRow";

import Features from "../../Components/Features/Features";
import Stats from "../../Components/Stats/Stats";
import CTA from "../../Components/CTA/CTA";
import FAQ from "../../Components/FAQ/FAQ";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <HeroCarousel />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <SectionRow title="Premiere of the Week" limit={5} startIndex={0} />
        <SectionRow title="New on Stream" limit={6} startIndex={5} />
        <SectionRow title="Upcoming Releases" limit={6} startIndex={11} />
        <SectionRow title="Top Rated Movies" limit={6} startIndex={17} />
        <SectionRow title="Popular Collections" limit={6} startIndex={23} />
      </div>

      {/* Extra Assignment Sections */}
      <Features />
      <Stats />
      <CTA />
      <FAQ />

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm py-8 border-t border-base-300"
      >
        © {new Date().getFullYear()} MovieMatrix 🎥 — Your ultimate movie experience.
      </motion.footer>
    </div>
  );
};

export default Home;
