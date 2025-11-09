import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Signed in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast(
          (t) => (
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-red-600">Incorrect Email / Password....</p>
              <p className="text-sm text-gray-600">If You Don’t have an Account.</p>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/signup");
                }}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Go to Signup
              </button>
            </div>
          ),
          { duration: 5000 }
        );
      } else {
        toast.error("Unable to sign in. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google sign-in failed. Try again later.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* LEFT SIDE IMAGE */}
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

      {/* RIGHT SIDE FORM */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex flex-col justify-center p-10 bg-white"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-500 text-center mb-6">
            Log in to continue your journey 🎬
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg bg-white shadow-sm transition hover:bg-gray-50 mb-4"
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>

          <div className="flex items-center justify-center text-gray-400 my-5">
            <span className="border-b border-gray-300 w-1/4"></span>
            <span className="mx-2 text-sm">or</span>
            <span className="border-b border-gray-300 w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
            >
              Log In
            </motion.button>
          </form>

          <p className="text-center text-gray-500 mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
