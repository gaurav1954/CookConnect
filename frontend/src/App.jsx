import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUP";
import Login from "./components/LogIn";
import RecipeForm from './components/RecipeForm';
import DiscoverRecipes from './components/DiscoverRecipes';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<RecipeForm />} />
          <Route path="/cards" element={<DiscoverRecipes />} />
        </Routes>
      </Router>
    </>
  );
}

