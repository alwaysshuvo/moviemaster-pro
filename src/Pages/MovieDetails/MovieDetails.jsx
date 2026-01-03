import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import api from "../../utils/api";
import MovieDetailsSkeleton from "../../Components/Skeletons/MovieDetailsSkeleton";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  /* ================= LOAD MOVIE + WATCHLIST ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const start = Date.now();

        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        if (user?.email) {
          const watchlistRes = await api.get(
            `/watchlist?email=${user.email}`
          );

          const found = watchlistRes.data.find(
            (item) => item.movieId === movieRes.data._id
          );
          setIsInWatchlist(!!found);
        }

        // Minimum skeleton time (UX polish)
        const elapsed = Date.now() - start;
        const minDelay = 700;
        if (elapsed < minDelay) {
          await new Promise((r) =>
            setTimeout(r, minDelay - elapsed)
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user?.email]);

  /* ================= LOAD RELATED MOVIES ================= */
  useEffect(() => {
    if (!movie?.genre) return;

    const loadRelated = async () => {
      try {
        setRelatedLoading(true);
        const res = await api.get("/movies");

        const related = res.data
          .filter(
            (m) =>
              m.genre === movie.genre &&
              m._id !== movie._id
          )
          .slice(0, 4);

        setRelatedMovies(related);
      } catch (err) {
        console.error("Failed to load related movies");
      } finally {
        setRelatedLoading(false);
      }
    };

    loadRelated();
  }, [movie]);

  /* ================= WATCHLIST HANDLER ================= */
  const handleWatchlist = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login", { state: { from: location } });
      return;
    }

    setProcessing(true);

    try {
      if (isInWatchlist) {
        const res = await api.get(`/watchlist?email=${user.email}`);
        const item = res.data.find((i) => i.movieId === movie._id);

        if (item) {
          await api.delete(`/watchlist/${item._id}`);
          setIsInWatchlist(false);
          toast.success("Removed from watchlist ❌");
        }
      } else {
        await api.post("/watchlist", {
          userEmail: user.email,
          movieId: movie._id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          rating: movie.rating,
          genre: movie.genre,
        });

        setIsInWatchlist(true);
        toast.success("Added to watchlist ❤️");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) return <MovieDetailsSkeleton />;
  if (!movie)
    return (
      <p className="text-center text-red-500 py-20">
        Movie not found
      </p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" />

      {/* BACKGROUND BLUR */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          filter: "blur(30px) brightness(35%)",
        }}
      />

      {/* ================= MAIN DETAILS ================= */}
      <div className="relative z-10 text-white py-20 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black/50 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
        >
          {/* POSTER */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-[520px] object-cover rounded-2xl shadow-lg"
          />

          {/* INFO */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400">
              {movie.title}{" "}
              <span className="text-gray-300 text-2xl">
                ({movie.releaseYear})
              </span>
            </h1>

            <div className="flex gap-3 text-sm flex-wrap">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400">
                ⭐ {movie.rating}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400">
                {movie.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400">
                {movie.language}
              </span>
            </div>

            <p className="text-gray-200 text-lg leading-relaxed">
              {movie.plotSummary}
            </p>

            <div className="flex gap-4 pt-4 flex-wrap">
              {user?.email === movie.addedBy && (
                <Link
                  to={`/movies/update/${movie._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
                >
                  Edit
                </Link>
              )}

              <button
                onClick={handleWatchlist}
                disabled={processing}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isInWatchlist
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
              >
                {processing
                  ? "Processing..."
                  : isInWatchlist
                  ? "Remove from Watchlist ❌"
                  : "Add to Watchlist ❤️"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= RELATED MOVIES ================= */}
      {relatedMovies.length > 0 && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-8"
          >
            🎥 You May Also Like
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 rounded-xl bg-gray-700 animate-pulse"
                  />
                ))
              : relatedMovies.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl"
                  >
                    <Link to={`/movies/${item._id}`}>
                      <div className="h-60 bg-black flex items-center justify-center">
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h4 className="text-white font-semibold truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">
                          ⭐ {item.rating} • {item.genre}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
