import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import './SaveButton.css'; // Assuming you have a CSS file for styling

export default function SaveButton({ recipeId, savedBy }) {
    const [saved, setSaved] = useState(0); // Initialize saved state to false
    const [savedCount, setSavedCount] = useState(savedBy)

    useEffect(() => {
        const fetchSavedStatus = async () => {
            try {
                const apiUrl = `http://localhost:8000/recipes/${recipeId}/saved-status`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                setSaved(data.saved); // Initialize shared state based on the response from the API
            } catch (error) {
                console.error('Error fetching shared status:', error);
            }
        };
        fetchSavedStatus();
    }, [recipeId]);
    const handleSaveClick = async () => {
        try {
            const apiUrl = 'http://localhost:8000/recipes';

            // Check the current state and toggle between saving and unsaving
            if (saved == true) {
                // Unsave the post
                await fetch(`${apiUrl}/unsave/${recipeId}`, {
                    method: 'POST',
                    credentials: 'include'
                });
                setSavedCount(prev => prev - 1);
            } if (saved == false) {
                // Save the post
                await fetch(`${apiUrl}/save/${recipeId}`, {
                    method: 'POST',
                    credentials: 'include'
                });
                setSavedCount(prev => prev + 1);
            }

            // Update saved state to reflect the change
            setSaved(old => !old);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Button variant="light-solid" className="save-button" onClick={handleSaveClick}>
            <FontAwesomeIcon className={`save-btn ${saved ? 'orange' : ''}`} icon={faBookmark} />
            <b className={`${saved ? 'orange' : ''}`}>{savedCount}</b>
        </Button>
    );
}
