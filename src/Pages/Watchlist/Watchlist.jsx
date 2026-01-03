import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/api";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Watchlist = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  /* ================= Fetch Watchlist ================= */
  useEffect(() => {
    if (!user?.email) return;

    api
      .get(`/watchlist?email=${user.email}`)
      .then((res) => {
        setWatchlist(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch watchlist");
        setWatchlist([]);
      })
      .finally(() => setLoading(false));
  }, [user]);

  /* ================= Delete Modal ================= */
  const openDeleteModal = (id, title) => {
    setDeleteId(id);
    setDeleteTitle(title);
    document.getElementById("delete_modal")?.showModal();
  };

  /* ================= Remove Watchlist ================= */
  const confirmRemove = async () => {
    try {
      await api.delete(`/watchlist/${deleteId}`);
      setWatchlist((prev) => prev.filter((item) => item._id !== deleteId));
      toast.success(`Removed "${deleteTitle}" from watchlist`);
    } catch {
      toast.error("Failed to remove movie");
    } finally {
      document.getElementById("delete_modal")?.close();
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-20">
      <Toaster position="top-center" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
          🎬 My Watchlist
        </h2>
        <p className="text-base-content/80 mt-2">
          All movies you saved to watch later
        </p>
      </motion.div>

      {/* Empty */}
      {watchlist.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          😢 No movies in your watchlist yet
        </div>
      ) : (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
          {watchlist.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-base-200"
            >
              <Link to={`/movies/${item.movieId}`}>
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="h-72 w-full object-cover"
                />
              </Link>

              <div className="p-4 text-center">
                <h4 className="font-semibold truncate">{item.title}</h4>
                <p className="text-sm text-gray-500">
                  ⭐ {item.rating} • {item.genre}
                </p>

                <button
                  onClick={() => openDeleteModal(item._id, item.title)}
                  className="btn btn-error btn-sm mt-3 text-white"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box text-center">
          <h3 className="text-lg font-bold text-red-500 mb-3">
            Remove from Watchlist?
          </h3>
          <p className="mb-6">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{deleteTitle}</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={confirmRemove} className="btn btn-error text-white">
              Yes, Remove
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Watchlist;
