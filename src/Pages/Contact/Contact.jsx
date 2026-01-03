import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully! 📩");
      e.target.reset();
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-10 rounded-2xl overflow-hidden"
      >
        {/* LEFT — GLASS GRADIENT CARD */}
        <div className="relative p-10 flex flex-col justify-center text-white">
          {/* Gradient Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-600/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-4">
              Get in Touch ✨
            </h2>

            <p className="opacity-90 mb-6 leading-relaxed">
              Have a question, feedback, or suggestion?
              <br />
              We’d love to hear from you.
            </p>

            <div className="space-y-2 text-sm opacity-90">
              <p>
                📧 <span className="font-semibold">Email:</span>{" "}
                support@moviematrix.com
              </p>
              <p>
                📞 <span className="font-semibold">Phone:</span>{" "}
                +880 1234-567890
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-10 bg-base-200 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Contact Form
          </h3>

          <input
            type="text"
            required
            placeholder="Your Name"
            className="input input-bordered w-full mb-4"
          />

          <input
            type="email"
            required
            placeholder="Your Email"
            className="input input-bordered w-full mb-4"
          />

          <textarea
            required
            placeholder="Your Message"
            rows="4"
            className="textarea textarea-bordered w-full mb-6"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="btn-view w-full border-none"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
