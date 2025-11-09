import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";
import SectionRow from "../../Components/HeroCards/SectionRow/SectionRow";
import AboutPlatform from "../../Components/AboutPlatform/AboutPlatform";
import GenreSection from "../../Components/GenreSection/GenreSection";


const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroCarousel />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <SectionRow title="Premiere of the Week" limit={5} startIndex={0} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-8"
      >
        <SectionRow title="New on Stream" limit={6} startIndex={5} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <SectionRow title="Upcoming Releases" limit={6} startIndex={11} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mt-8"
      >
        <SectionRow title="Top Rated Movies" limit={6} startIndex={17} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-8 pb-16"
      >
        <SectionRow title="Popular Collections" limit={6} startIndex={23} />
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-gray-400 text-sm py-6 border-t border-slate-700/50"
      >
        © {new Date().getFullYear()} MovieMaster Pro 🎥 — Your ultimate movie experience.
      </motion.footer>
    </div>
  );
};

export default Home;
