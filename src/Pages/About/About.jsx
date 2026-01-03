import { motion } from "framer-motion";
import { FaFilm, FaUsers, FaHeart, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: <FaFilm />,
    title: "Curated Cinema",
    desc: "Discover hand-picked movies from classics to modern masterpieces.",
  },
  {
    icon: <FaUsers />,
    title: "For Movie Lovers",
    desc: "Built for people who truly love cinema and storytelling.",
  },
  {
    icon: <FaHeart />,
    title: "Personal Experience",
    desc: "Create watchlists and collections tailored to your taste.",
  },
  {
    icon: <FaBolt />,
    title: "Fast & Smooth",
    desc: "Optimized performance with modern UI and animations.",
  },
];

const About = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About MovieMatrix
          </h1>
          <p className="text-lg opacity-90">
            A modern platform designed to explore, organize, and enjoy movies —
            all in one place.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="opacity-80 leading-relaxed">
            MovieMatrix aims to simplify the way people discover and manage
            movies. Whether you love timeless classics or the latest releases,
            our platform brings everything together in a clean and enjoyable
            experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="opacity-80 leading-relaxed">
            We envision MovieMatrix as a trusted companion for movie lovers —
            offering powerful features, elegant design, and a seamless browsing
            experience across all devices.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-14"
          >
            Why Choose MovieMatrix?
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          "1200+ Movies",
          "500+ Users",
          "30+ Collections",
          "4.8★ Rating",
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-base-200 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-primary">{stat}</h3>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default About;
