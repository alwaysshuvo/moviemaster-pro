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
        className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-base-200 rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Left Info */}
        <div className="p-10 flex flex-col justify-center bg-gradient-to-br from-primary to-secondary text-primary-content">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="opacity-90 mb-6">
            Have a question, feedback, or suggestion?  
            We’d love to hear from you.
          </p>
          <p className="text-sm opacity-80">
            Email: support@moviematrix.com  
            <br />
            Phone: +880 1234-567890
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-10">
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
            className="btn btn-primary w-full"
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
