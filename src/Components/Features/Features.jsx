import { motion } from "framer-motion";
import { FaFilm, FaHeart, FaBolt, FaUserFriends } from "react-icons/fa";

const features = [
  {
    icon: <FaFilm />,
    title: "Curated Movies",
    desc: "Hand-picked collections from classics to modern cinema.",
  },
  {
    icon: <FaHeart />,
    title: "Smart Watchlist",
    desc: "Save, track, and manage movies you love effortlessly.",
  },
  {
    icon: <FaBolt />,
    title: "Fast Experience",
    desc: "Optimized performance with smooth animations.",
  },
  {
    icon: <FaUserFriends />,
    title: "Personalized",
    desc: "Tailored recommendations based on your taste.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why MovieMatrix?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
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
  );
};

export default Features;
