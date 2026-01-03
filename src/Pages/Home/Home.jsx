import React from "react";
import { motion } from "framer-motion";

import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";
import SectionRow from "../../Components/HeroCards/SectionRow/SectionRow";

import Features from "../../Components/Features/Features";
import Stats from "../../Components/Stats/Stats";
import CTA from "../../Components/CTA/CTA";
import FAQ from "../../Components/FAQ/FAQ";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

const Home = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 mt-10"
      >
        <HeroCarousel />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <SectionRow title="Premiere of the Week" limit={5} startIndex={0} />
        </motion.section>

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          <SectionRow title="New on Stream" limit={6} startIndex={5} />
        </motion.section>

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <SectionRow title="Upcoming Releases" limit={6} startIndex={11} />
        </motion.section>

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <SectionRow title="Top Rated Movies" limit={6} startIndex={17} />
        </motion.section>

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
        >
          <SectionRow title="Popular Collections" limit={6} startIndex={23} />
        </motion.section>
      </div>

      {/* EXTRA SECTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Features />
        <Stats />
        <CTA />
        <FAQ />
      </motion.div>
    </div>
  );
};

export default Home;
