import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUP";
import Login from "./components/LogIn";
import RecipeForm from './components/RecipeForm';
import DiscoverRecipes from './components/DiscoverRecipes';
import Layout from './components/Layout';

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" >
              <Route index element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route path="new" element={<RecipeForm />} />
              <Route path="recipes" element={<DiscoverRecipes />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

