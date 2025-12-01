import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import MainLayout from "../MainLayout/MainLayout";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";

const Home = lazy(() => import("../Pages/Home/Home"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Signup = lazy(() => import("../Pages/Signup/Signup"));
const AllMovies = lazy(() => import("../Pages/All-Movies/AllMovies"));
const AddMovie = lazy(() => import("../Pages/AddMovie/AddMovie"));
const MyCollection = lazy(() => import("../Pages/My-Collection/MyCollection"));
const MovieDetails = lazy(() => import("../Pages/MovieDetails/MovieDetails"));
const UpdateMovie = lazy(() => import("../Pages/UpdateMovie/UpdateMovie"));
const Watchlist = lazy(() => import("../Pages/Watchlist/Watchlist"));
const FilterMovies = lazy(() => import("../Pages/Filter/FilterMovies"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
        loader: async () => {
          const base =
            import.meta.env.VITE_API_BASE ||
            "http://localhost:5000";
          const res = await fetch(`${base}/movies`);
          return res.json();
        },
      },

      {
        path: "/movies",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllMovies />
          </Suspense>
        ),
        loader: async () => {
          const base =
            import.meta.env.VITE_API_BASE ||
            "http://localhost:5000";
          const res = await fetch(`${base}/movies`);
          return res.json();
        },
      },

      {
        path: "/movies/add",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <AddMovie />
            </PrivateRoute>
          </Suspense>
        ),
      },

      {
        path: "/movies/my-collection",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <MyCollection />
            </PrivateRoute>
          </Suspense>
        ),
      },

      {
        path: "/movies/update/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <UpdateMovie />
            </PrivateRoute>
          </Suspense>
        ),
      },

      {
        path: "/movies/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MovieDetails />
          </Suspense>
        ),
      },

      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
          </Suspense>
        ),
      },

      {
        path: "/filter",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FilterMovies />
          </Suspense>
        ),
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PublicRoute>
              <Login />
            </PublicRoute>
          </Suspense>
        ),
      },

      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PublicRoute>
              <Signup />
            </PublicRoute>
          </Suspense>
        ),
      },

      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
