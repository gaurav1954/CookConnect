import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';
import DiscoverRecipes from './components/DiscoverRecipes';
import Layout from './components/Layout';
import SignUp from "./components/SignUP";
import Login from "./components/LogIn";
import './app.css'

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
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

