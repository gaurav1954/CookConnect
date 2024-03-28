import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import './DiscoverRecipes.css'
import Categories from '../components/Categories';
export default function DiscoverRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [initialRender, setInitialRender] = useState(true); // New state variable to track initial render

    useEffect(() => {
        if (!initialRender) { // Check if it's not the initial render
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/recipes/${page}/4`);
                    setRecipes(prevRecipes => [...prevRecipes, ...response.data]);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    setIsLoading(false);
                }
            };

            fetchData();
        } else {
            setInitialRender(false); // Update initial render state after the initial render
        }
    }, [page, initialRender]); // Fetch data whenever page number changes or after initial render

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="pcontainer">
            <div className="categoryFilter">
                <Categories></Categories>
            </div>
            <div className='discover'>
                <div className="heading">
                    <h2>Discover Recipes</h2>
                    <p>Find and share everyday cooking inspiration with ratings and reviews you can trust. Recipes for easy dinners, healthy eating, fast and cheap, kid-friendly, and more</p>
                </div>
                {isLoading && !initialRender ? (
                    <p>Loading...</p>
                ) : (
                    <div className="discover-recipes">
                        <div className='discover-container'>
                            {recipes.map(recipe => (
                                <Cards key={recipe._id} recipeId={recipe._id} {...recipe}></Cards>
                            ))}
                        </div>
                        <button className='load-recipe' onClick={handleLoadMore}>Load More</button>
                    </div>
                )}
            </div>
        </div>
    );
}
