import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const { user } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <LoadingSpinner />;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("🎬 Signed in successfully!");
      setTimeout(() => navigate(from, { replace: true }), 800);
    } catch (error) {
      console.error("Login Error:", error.code);
      let message = "Login failed!";
      if (error.code === "auth/invalid-email") message = "Invalid email address!";
      else if (error.code === "auth/user-not-found") message = "User not found!";
      else if (error.code === "auth/wrong-password") message = "Wrong password!";
      else if (error.code === "auth/too-many-requests")
        message = "Too many attempts. Try again later.";
      toast.error(`❌ ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("✅ Signed in with Google!");
      setTimeout(() => navigate(from, { replace: true }), 800);
    } catch (err) {
      console.error("Google sign-in failed:", err);
      toast.error("❌ Google sign-in failed. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100 text-base-content transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 w-full flex items-center justify-center"
      >
        <img
          src="https://i.ibb.co.com/SDPh1d7z/Retro-cinema-icon-tripod-banner-cinematography-obsolete.jpg"
          alt="Cinema Camera"
          className="w-full h-screen object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex flex-col justify-center p-10"
      >
        <motion.div className="w-full max-w-md mx-auto bg-base-200 p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="opacity-70 text-center mb-6">
            Log in to continue your journey 🎬
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 border border-base-300 py-2.5 rounded-lg bg-base-100 shadow-sm transition hover:bg-base-300 mb-4"
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-base-300 bg-base-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-base-300 bg-base-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 opacity-70"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary hover:underline text-sm"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {submitting ? "Logging in..." : "Log In"}
            </motion.button>
          </form>

          <p className="text-center opacity-70 mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
