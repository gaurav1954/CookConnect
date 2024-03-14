import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUP";
import Login from "./components/LogIn";
import RecipeForm from './components/RecipeForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<RecipeForm />} />
      </Routes>
    </Router>
  );
}