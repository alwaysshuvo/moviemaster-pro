import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import LoadingAnimation from "../../Components/LoadingSpinner/LoadingAnimation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <LoadingSpinner />;

  const getPasswordValidationError = (password) => {
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      const err = getPasswordValidationError(value);
      setPasswordError(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photoURL, email, password } = formData;
    const passErr = getPasswordValidationError(password);
    if (passErr) {
      toast.error(passErr);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name, photoURL });
      toast.success("🎉 Account created successfully!");
      await signOut(auth);
      navigate("/login", { replace: true, state: { from } });
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "⚠️ This email is already registered. Try logging in instead."
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error("❌ Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        toast.error("⚠️ Password is too weak.");
      } else {
        toast.error("❌ Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up successfully with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100 text-base-content transition-all duration-300">
      <Toaster position="top-center" /> {/* ✅ Toast Enabled */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-base-100 flex flex-col justify-center p-10"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-base-200 p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-3 text-center">Sign Up</h1>
          <p className="opacity-70 text-center mb-6">
            Join the MovieMatrix community 🎬
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 opacity-70"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? <LoadingAnimation small /> : "Sign Up"}
            </button>
          </form>

          <div className="divider my-5">OR</div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn w-full bg-base-200 border border-base-300 hover:bg-base-300 flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>

          <p className="text-center opacity-70 mt-5 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex items-center justify-center p-10"
      >
        <img
          src="https://i.ibb.co.com/ZRg67HWy/Poster-movie-camera-Premium-Vector.jpg"
          alt="Cinema Poster"
          className="max-w-full max-h-[120vh] object-contain rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default Signup;
