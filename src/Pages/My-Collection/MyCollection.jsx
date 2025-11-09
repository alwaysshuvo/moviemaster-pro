import React, { useContext, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

const MyCollection = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-screen text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Please log in to see your profile.
        </h2>
      </motion.div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setMessage("❌ Failed to update profile: " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-gray-200"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <img
            src={user.photoURL || "https://i.ibb.co/ZmFHZDM/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto shadow-md border-4 border-purple-200"
          />
        </motion.div>

        {!isEditing ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold mt-4 text-gray-800"
            >
              {user.displayName || "Unnamed User"}
            </motion.h2>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 justify-center"
            >
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Update Profile
              </button>
              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Logout
              </button>
            </motion.div>
          </>
        ) : (
          <motion.form
            onSubmit={handleUpdateProfile}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-left"
          >
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {message && (
              <p className="text-center text-sm mb-3 text-green-600">
                {message}
              </p>
            )}

            <div className="flex gap-3 justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MyCollection;
