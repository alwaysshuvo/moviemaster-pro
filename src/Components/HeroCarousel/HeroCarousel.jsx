
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then(res => res.json())
      .then(data => setMovies(data.slice(0, 5)));
  }, []);

  return (
    <div className="carousel w-full h-[85vh] rounded-none overflow-hidden relative">
      {movies.map((movie, i) => (
        <div key={i} className="carousel-item relative w-full">
          <img
            src={movie.posterUrl}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end px-10 md:px-24 pb-20 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              {movie.title}
            </motion.h2>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl">
              {movie.plotSummary.slice(0, 150)}...
            </p>
            <div className="mt-4 text-yellow-400 font-semibold">
              ⭐ {movie.rating} • {movie.genre} • {movie.releaseYear}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
