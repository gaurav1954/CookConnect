import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Post from '../components/Post';
export default function Feed() {
    const location = useLocation();

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [initialRender, setInitialRender] = useState(true); // New state variable to track initial render

    useEffect(() => {
        if (!initialRender) {
            const fetchData = async () => {
                try {
                    let url = `http://localhost:8000/recipes/${page}/6`;
                    if (location.state)
                        url += `?cuisine=${location.state.cuisine}`
                    const response = await fetch(url, {
                        method: 'GET',
                        credentials: 'include' // Include credentials for cross-origin requests
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch');
                    }
                    const data = await response.json();
                    setRecipes(prevRecipes => [...prevRecipes, ...data]);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    setIsLoading(false);
                }
            };

            fetchData();
        } else {
            setInitialRender(false);
        }
    }, [page, initialRender]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };


    return (
        <>
            {isLoading && !initialRender ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="feed">
                        {recipes.map(recipe => (
                            <Post key={recipe._id} recipeId={recipe._id} {...recipe} />
                        ))}

                    </div>
                    <div className="centered-container">
                        <button className='load-recipe' onClick={handleLoadMore}>Load More</button>
                    </div>
                </>
            )}
        </>
    );
}
