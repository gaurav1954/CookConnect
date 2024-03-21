import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';
import DiscoverRecipes from './components/DiscoverRecipes';
import Layout from './components/Layout';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProfilePage from "./components/profilePage"; 
import './app.css';
import LandingPage from './components/LandingPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<ProfilePage />} /> {/* Add this line for the profile page */}
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
