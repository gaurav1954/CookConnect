"use client";

import { useState, useEffect } from "react";
import Post from "../components/Post";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Feed.css"; // Reusing Feed styles for consistency

export default function Saved() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_API_URL}/recipes/saved`,
          {
            method: "GET",
            credentials: "include", // Include credentials for cross-origin requests
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setRecipes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Dependency array is empty, so this effect runs only once when the component mounts

  return (
    <motion.div
      className="feed-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="feed-header">
        <h1 className="feed-title">
          Your <span className="highlight">Saved</span> Recipes
        </h1>
        <p>Recipes you've bookmarked for later</p>
      </div>

      {isLoading ? (
        <div className="feed-loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading your saved recipes...</p>
        </div>
      ) : (
        <div className="feed">
          {recipes.length === 0 ? (
            <motion.div
              className="no-recipes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                size="3x"
                style={{ color: "#2d6a4f", marginBottom: "20px" }}
              />
              <h2>No saved recipes yet</h2>
              <p>Start exploring and save recipes you'd like to try later!</p>
            </motion.div>
          ) : (
            recipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feed-post-container"
              >
                <Post key={recipe._id} recipeId={recipe._id} {...recipe} />
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
