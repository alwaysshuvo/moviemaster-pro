import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SectionRow = ({ title, limit, startIndex }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then(res => res.json())
      .then(data => setMovies(data.slice(startIndex, startIndex + limit)));
  }, [limit, startIndex]);

  return (
    <div className="my-10 px-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <Link to="/all-movies" className="text-sm text-blue-400 hover:underline">
          See All →
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 bg-slate-800 rounded-xl overflow-hidden shadow hover:scale-105 transition"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-2 text-center">
              <h4 className="text-sm font-semibold text-white truncate">
                {movie.title}
              </h4>
              <p className="text-xs text-gray-400">⭐ {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionRow;
