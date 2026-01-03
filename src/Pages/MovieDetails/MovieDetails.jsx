import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../Provider/AuthProvider";
import api from "../../utils/api";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [processing, setProcessing] = useState(false);

  /* ================= Load Movie + Watchlist ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
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
      } catch (err) {
        console.error(err);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user?.email]);

  /* ================= Add / Remove Watchlist ================= */
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

  if (loading) return <LoadingSpinner />;
  if (!movie)
    return <p className="text-center text-red-500">Movie not found</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" />

      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          filter: "blur(30px) brightness(35%)",
        }}
      />

      <div className="relative z-10 text-white py-20 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black/50 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
        >
          {/* Poster */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-[520px] object-cover rounded-2xl shadow-lg"
          />

          {/* Info */}
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
    </div>
  );
};

export default MovieDetails;
