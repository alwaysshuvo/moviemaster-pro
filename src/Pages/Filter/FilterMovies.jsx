import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FilterMovies = ({ onFilter, autoApply = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Fantasy",
    "Sci-Fi",
    "Animation",
    "Romance",
    "Horror",
  ];

  /* ================= AUTO APPLY (DEBOUNCE) ================= */
  useEffect(() => {
    if (!autoApply) return;

    const debounce = setTimeout(() => {
      onFilter({
        searchTerm,
        selectedGenre,
        ratingRange,
      });
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm, selectedGenre, ratingRange, autoApply, onFilter]);

  /* ================= HANDLERS ================= */
  const handleApply = () => {
    onFilter({
      searchTerm,
      selectedGenre,
      ratingRange,
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedGenre("");
    setRatingRange([0, 10]);
    onFilter({
      searchTerm: "",
      selectedGenre: "",
      ratingRange: [0, 10],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 px-6"
    >
      <div className="flex flex-wrap justify-center items-center gap-4 bg-base-200/60 backdrop-blur-md rounded-2xl p-6 shadow-md">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search movies..."
          className="input input-bordered w-64 bg-base-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* GENRE */}
        <select
          className="select select-bordered w-44 bg-base-100"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* RATING */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">⭐</span>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={ratingRange[0]}
            onChange={(e) =>
              setRatingRange([Number(e.target.value), ratingRange[1]])
            }
            className="input input-bordered w-20 text-center bg-base-100"
          />

          <span className="text-sm">to</span>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={ratingRange[1]}
            onChange={(e) =>
              setRatingRange([ratingRange[0], Number(e.target.value)])
            }
            className="input input-bordered w-20 text-center bg-base-100"
          />
        </div>

        {/* ACTION BUTTONS */}
        {!autoApply && (
          <button
            onClick={handleApply}
            className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none px-6"
          >
            Apply
          </button>
        )}

        <button
          onClick={handleClear}
          className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
};

export default FilterMovies;
