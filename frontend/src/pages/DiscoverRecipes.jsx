import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import './DiscoverRecipes.css';
import Categories from '../components/Categories';

export default function DiscoverRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (!initialRender) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/recipes/${page}/4`, {
                        method: 'GET',
                        credentials: 'include' // Include credentials
                    });
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
            <div className="rows row0">
                <div className='Caption'>
                    <p className='maincap'> <span className="orange">Foodies, Gear up</span> </p>
                    <p className='cap'>Fuel Your Culinary <span className="orange">Curiosity!</span> </p>
                    <p className='cap'>Share Your Best Recipes, </p>
                    <p className='cap'>Connect with Food Lovers,</p>
                    <p className='cap'>and Let Your Kitchen <span className="orange">Creativity</span> <br />Flourish.</p>
                </div>
            </div>
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
                                    <Cards key={recipe._id} recipeId={recipe._id} {...recipe} ></Cards>
                                ))}
                            </div>
                            <button className='load-recipe' onClick={handleLoadMore}>Load More</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
