import { motion } from "framer-motion";

const faqs = [
  {
    q: "Is MovieMatrix free to use?",
    a: "Yes, MovieMatrix is completely free for browsing and managing movies.",
  },
  {
    q: "Can I create my own movie collection?",
    a: "Absolutely! Logged-in users can create and manage collections.",
  },
  {
    q: "Is my watchlist saved?",
    a: "Yes, your watchlist is securely stored in your account.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-lg p-5 cursor-pointer"
            >
              <summary className="font-semibold">{faq.q}</summary>
              <p className="mt-2 text-sm opacity-80">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
