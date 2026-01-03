import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-secondary text-primary-content">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center px-4"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore Cinema Like Never Before?
        </h2>
        <p className="mb-8 opacity-90">
          Join MovieMatrix today and discover movies tailored just for you.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn btn-neutral">
            Get Started
          </Link>
          <Link to="/movies" className="btn btn-outline">
            Browse Movies
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
