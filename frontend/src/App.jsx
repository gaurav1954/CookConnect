"use client";

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecipeForm from "./pages/RecipeForm";
import DiscoverRecipes from "./pages/DiscoverRecipes";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/LogIn";
import "./App.css";
import COMPLETE_RECIPE from "./pages/COMPLETE_RECIPE";
import Feed from "./pages/Feed";
import Saved from "./pages/Saved";
import PROFILE_INFO from "./pages/PROFILE_INFO";

export default function App() {
  // Check if user is logged in for the first time
  useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_API_URL}/auth/check-profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isFirstLogin) {
            // Redirect to profile page if it's first login
            window.location.href = "/profile";
          }
        }
      } catch (error) {
        console.error("Error checking first login status:", error);
      }
    };

    // Only run on protected routes
    if (!["/login", "/signup"].includes(window.location.pathname)) {
      checkFirstLogin();
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Layout />}>
            <Route path="new" element={<RecipeForm />} />
            <Route path="recipes" element={<DiscoverRecipes />} />
            <Route path="feed" element={<Feed />} />
            <Route path="saved" element={<Saved />} />
            <Route path="post" element={<COMPLETE_RECIPE />} />
            <Route path="profile" element={<PROFILE_INFO />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
