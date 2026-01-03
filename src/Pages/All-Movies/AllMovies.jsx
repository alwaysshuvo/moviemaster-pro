import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import FilterMovies from "../Filter/FilterMovies";

const AllMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedGenre: "",
    ratingRange: [0, 10],
    sort: "latest",
  });

  /* ================= FETCH MOVIES (ONCE / FILTER CHANGE) ================= */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await api.get("/movies");
        setMovies(res.data || []);
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  /* ================= APPLY FILTERS (FRONTEND) ================= */
  useEffect(() => {
    let data = [...movies];

    // 🔍 Search
    if (filters.searchTerm) {
      data = data.filter((m) =>
        m.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // 🎭 Genre
    if (filters.selectedGenre) {
      data = data.filter((m) => m.genre === filters.selectedGenre);
    }

    // ⭐ Rating
    data = data.filter(
      (m) =>
        m.rating >= filters.ratingRange[0] &&
        m.rating <= filters.ratingRange[1]
    );

    // 🔀 Sorting
    if (filters.sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "title") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredMovies(data);
  }, [filters, movies]);

  /* ================= FILTER HANDLER (MEMOIZED) ================= */
  const handleFilter = useCallback((data) => {
    setFilters((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-20 transition-all duration-300">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">
          🎬 All Movies
        </h2>
        <p className="text-base-content/80 text-lg max-w-2xl mx-auto">
          Discover, filter, and explore movies from your cinematic universe.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </div>
      </motion.div>

      {/* ================= FILTER BAR ================= */}
      <FilterMovies onFilter={handleFilter} />

      {/* ================= SORT ================= */}
      <div className="flex justify-center mb-12">
        <select
          className="select select-bordered w-56"
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="latest">🆕 Latest</option>
          <option value="rating">⭐ Top Rated</option>
          <option value="title">🔤 Title A–Z</option>
        </select>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {filteredMovies.length === 0 && (
        <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
          😢 No movies found. Try adjusting filters.
        </div>
      )}

      {/* ================= MOVIE GRID ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8"
      >
        {filteredMovies.map((movie) => (
          <motion.div
            key={movie._id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative group bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-gray-200/50 
                       dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/60 
                       rounded-2xl overflow-hidden shadow-md hover:shadow-2xl"
          >
            <Link to={`/movies/${movie._id}`}>
              <div className="w-full h-72 flex items-center justify-center bg-base-200">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) =>
                    (e.target.src =
                      "https://dummyimage.com/400x600/000/fff&text=No+Image")
                  }
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                              flex flex-col justify-end p-4">
                <h4 className="text-lg font-semibold text-white truncate">
                  {movie.title}
                </h4>
                <p className="text-sm text-gray-300 mt-1">
                  ⭐ {movie.rating} • {movie.genre}
                </p>
                <div className="mt-3">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 
                                   text-white px-3 py-1.5 rounded-full text-xs font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ================= FOOTER ================= */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center text-base-content/70 text-sm mt-20"
      >
        © {new Date().getFullYear()} MovieMatrix 🎥 — Crafted with Passion.
      </motion.footer>
    </div>
  );
};

export default AllMovies;
