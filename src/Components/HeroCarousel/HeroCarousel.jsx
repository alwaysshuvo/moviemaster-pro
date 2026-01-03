import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api
      .get("/movies")
      .then((res) => setMovies(res.data.slice(0, 6)))
      .catch((err) => console.error(err));
  }, []);

  if (!movies.length) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">

      {/* LEFT FADE (dark only) */}
      <div
        className="
          pointer-events-none absolute left-0 top-0 h-full w-40 z-10
          hidden dark:block
          bg-gradient-to-r from-black via-black/80 to-transparent
        "
      />

      {/* RIGHT FADE (dark only) */}
      <div
        className="
          pointer-events-none absolute right-0 top-0 h-full w-40 z-10
          hidden dark:block
          bg-gradient-to-l from-black via-black/80 to-transparent
        "
      />

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        speed={1000}
        className="h-[90vh] md:h-[95vh] relative z-30"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <div className="relative w-full h-full bg-white dark:bg-black">

                {/* IMAGE */}
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover md:object-contain"
                />

                {/* 🔥 BOTTOM GRADIENT → ONLY DARK MODE */}
                <div
                  className="
                    pointer-events-none absolute bottom-0 left-0 w-full h-[45%]
                    hidden dark:block
                    bg-gradient-to-t from-black/95 via-black/60 to-transparent
                  "
                />

                {/* TEXT */}
                <div className="absolute bottom-[12%] left-[8%] z-20 max-w-2xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white"
                  >
                    {movie.title}
                  </motion.h2>

                  <p className="mt-4 text-gray-700 dark:text-gray-200">
                    {movie.plotSummary?.slice(0, 160)}...
                  </p>

                  <div className="mt-4 flex gap-3">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full">
                      ⭐ {movie.rating}
                    </span>
                    <span className="px-4 py-1 rounded-full bg-black/10 dark:bg-white/25 text-gray-900 dark:text-white">
                      {movie.genre}
                    </span>
                    <span className="px-4 py-1 rounded-full bg-black/10 dark:bg-white/25 text-gray-900 dark:text-white">
                      {movie.releaseYear}
                    </span>
                  </div>

                  <button className="mt-6 btn-view px-6 py-3 rounded-full">
                    View Details →
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
