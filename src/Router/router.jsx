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
const About = lazy(() => import("../Pages/About/About"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },

      {
        path: "/movies",
        element: withSuspense(AllMovies),
      },

      {
        path: "/about",
        element: withSuspense(About),
      },

      {
        path: "/contact",
        element: withSuspense(Contact),
      },

      {
        path: "/movies/add",
        element: (
          <PrivateRoute>
            {withSuspense(AddMovie)}
          </PrivateRoute>
        ),
      },

      {
        path: "/movies/my-collection",
        element: (
          <PrivateRoute>
            {withSuspense(MyCollection)}
          </PrivateRoute>
        ),
      },

      {
        path: "/movies/update/:id",
        element: (
          <PrivateRoute>
            {withSuspense(UpdateMovie)}
          </PrivateRoute>
        ),
      },

      {
        path: "/movies/:id",
        element: withSuspense(MovieDetails),
      },

      {
        path: "/watchlist",
        element: (
          <PrivateRoute>
            {withSuspense(Watchlist)}
          </PrivateRoute>
        ),
      },

      {
        path: "/filter",
        element: withSuspense(FilterMovies),
      },

      {
        path: "/login",
        element: (
          <PublicRoute>
            {withSuspense(Login)}
          </PublicRoute>
        ),
      },

      {
        path: "/signup",
        element: (
          <PublicRoute>
            {withSuspense(Signup)}
          </PublicRoute>
        ),
      },

      {
        path: "/forgot-password",
        element: (
          <PublicRoute>
            {withSuspense(ForgotPassword)}
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
