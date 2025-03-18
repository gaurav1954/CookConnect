"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import "./Feed.css";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Feed() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [initialRender, setInitialRender] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    if (!initialRender) {
      fetchRecipes();
    } else {
      setInitialRender(false);
    }
  }, [page, initialRender]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [recipes]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchRecipes = async () => {
    try {
      setLoadingMore(true);
      let url = `${import.meta.env.VITE_REACT_API_URL}/recipes/${page}/6`;
      if (location.state && location.state.cuisine) {
        url += `?cuisine=${location.state.cuisine}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      }

      setIsLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  return (
    <motion.div
      className="feed-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {location.state && location.state.cuisine && (
        <div className="feed-header">
          <h1 className="feed-title">
            Exploring{" "}
            <span className="highlight">{location.state.cuisine}</span> Cuisine
          </h1>
        </div>
      )}

      {isLoading && !initialRender ? (
        <div className="feed-loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading delicious recipes...</p>
        </div>
      ) : (
        <>
          <AnimatePresence>
            <div className="feed">
              {recipes.length === 0 ? (
                <motion.div
                  className="no-recipes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>No recipes found</h2>
                  <p>Try exploring different cuisines or check back later!</p>
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
                    <Post recipeId={recipe._id} {...recipe} />
                  </motion.div>
                ))
              )}
            </div>
          </AnimatePresence>

          {hasMore && (
            <div ref={loader} className="feed-loader">
              {loadingMore && (
                <div className="loading-more">
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Loading more recipes...</span>
                </div>
              )}
            </div>
          )}

          {!hasMore && recipes.length > 0 && (
            <div className="end-message">
              <p>You've reached the end of the feed!</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
