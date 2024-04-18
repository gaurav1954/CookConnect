import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './pages/RecipeForm';
import DiscoverRecipes from './pages/DiscoverRecipes';
import Layout from './pages/Layout';
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import ProfilePage from './pages/ProfilePage';
import './app.css';
import LandingPage from './pages/LandingPage';
import COMPLETE_RECIPE from './components/COMPLETE_RECIPE';
import Feed from './pages/Feed';
import Saved from './pages/Saved';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="new" element={<RecipeForm />} />
            <Route path="recipes" element={<DiscoverRecipes />} />
            <Route path="feed" element={<Feed />} />
            <Route path="saved" element={<Saved />} />
            <Route path='post' element={<COMPLETE_RECIPE />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
