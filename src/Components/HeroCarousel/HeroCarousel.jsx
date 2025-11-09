import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then(res => res.json())
      .then(data => setMovies(data.slice(0, 5))); // first 5 as featured
  }, []);

  return (
    <div className="carousel w-full h-[70vh] rounded-xl overflow-hidden">
      {movies.map((movie, i) => (
        <div key={i} className="carousel-item relative w-full">
          <img src={movie.posterUrl} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-2"
            >
              {movie.title}
            </motion.h2>
            <p className="text-sm md:text-base text-gray-200 max-w-xl">
              {movie.plotSummary.slice(0, 150)}...
            </p>
            <div className="mt-3 text-yellow-400 font-semibold">
              ⭐ {movie.rating} • {movie.genre} • {movie.releaseYear}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
