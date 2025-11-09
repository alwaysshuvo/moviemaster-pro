import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🎬 All Movies
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover your favorite movies, explore ratings, genres, and more — all in one cinematic hub.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative bg-slate-800/40 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-blue-500 hover:shadow-blue-500/30 transition-all"
          >
            <div className="relative group">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-t-2xl group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                <p className="text-sm text-gray-300">
                  ⭐ {movie.rating} • {movie.genre} • {movie.releaseYear}
                </p>
                <Link
                  to={`/movies/${movie.id}`}
                  className="mt-3 inline-block text-sm bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-center text-gray-400 text-sm mt-16"
      >
        © {new Date().getFullYear()} MovieMaster Pro 🎥 — Crafted with Passion.
      </motion.footer>
    </div>
  );
};

export default AllMovies;
