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
import Categories from './components/Categories';

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
            <Route path="cat" element={<Categories />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="new" element={<RecipeForm />} />
            <Route path="recipes" element={<DiscoverRecipes />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
