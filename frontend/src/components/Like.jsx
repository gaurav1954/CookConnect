import React from 'react'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Like.css';
import './Cards.css';
export default function Like({ likes = 10, recipeId }) {
    const [liked, setLiked] = useState(0);
    const [likeCount, setLikeCount] = useState(likes); // Initialize like count to 0 initially

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const apiUrl = `http://localhost:8000/recipes/${recipeId}/like-status`; // API endpoint to get like status
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include' // Include credentials in the request
                });
                const data = await response.json();
                setLiked(data.liked); // Initialize liked state based on the response from the API
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };
        fetchLikeStatus();
    }, [recipeId]);
    // Execute effect when recipeId changes
    const handleLikeClick = async () => {
        try {
            const apiUrl = 'http://localhost:8000/recipes'; // API base URL

            if (liked == true) {
                // Unlike the recipe
                await fetch(`${apiUrl}/unlike/${recipeId}`, {
                    method: 'POST',
                    credentials: 'include', // Include credentials in the request
                });

                setLikeCount(prevCount => prevCount - 1); // Decrease like count
            }
            if (liked == false) {
                // Like the recipe
                await fetch(`${apiUrl}/like/${recipeId}`, {
                    method: 'POST',
                    credentials: 'include', // Include credentials in the request
                });
                setLikeCount(prevCount => prevCount + 1); // Increase like count
            }
            setLiked(old => !old); // Toggle liked state
        }
        catch (error) {
            console.error('Error:', error);

        }
    };
    return (
        <Button variant="light-danger" className='Like-btn' onClick={handleLikeClick}>
            <FontAwesomeIcon className={`like-button ${liked ? 'orange' : ""}`} icon={faThumbsUp} />
            <b className={`${liked ? 'orange' : ""}`}>{likeCount}</b>
        </Button>
    )
}
