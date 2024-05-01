import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './pages/RecipeForm';
import DiscoverRecipes from './pages/DiscoverRecipes';
import Layout from './pages/Layout';
import SignUp from './pages/SignUp';
import Login from "./pages/LogIn";
import './app.css';
import COMPLETE_RECIPE from './pages/COMPLETE_RECIPE';
import Feed from './pages/Feed';
import Saved from './pages/Saved';
import FormProfile from './pages/FormProfile';
import PROFILE_INFO from './pages/PROFILE_INFO';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile-form" element={<FormProfile />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="new" element={<RecipeForm />} />
            <Route path="recipes" element={<DiscoverRecipes />} />
            <Route path="feed" element={<Feed />} />
            <Route path="saved" element={<Saved />} />
            <Route path='post' element={<COMPLETE_RECIPE />} />
            <Route path="profile" element={<PROFILE_INFO />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
