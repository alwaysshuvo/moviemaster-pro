import { motion } from "framer-motion";

const stats = [
  { label: "Movies", value: "1200+" },
  { label: "Active Users", value: "500+" },
  { label: "Collections", value: "30+" },
  { label: "Avg Rating", value: "4.8★" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-base-200"
          >
            <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
            <p className="mt-2 text-sm opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
