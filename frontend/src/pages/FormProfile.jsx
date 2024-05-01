import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormProfile.css';
export default function FormProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: location.state.username || '',
        name: '',
        age: '',
        location: '',
        bio: '',
        favoriteCuisine: '',
        cookingExperience: '',
        allergies: '',
        instagram: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/update-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                // Reset form state
                setFormData({
                    username: 'John',
                    name: '',
                    age: '',
                    location: '',
                    bio: '',
                    favoriteCuisine: '',
                    cookingExperience: '',
                    allergies: '',
                    instagram: '',
                });
                setIsLoading(false);
                navigate("/profile");
            } else {
                alert("Failed to send data.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while creating recipe.");
        }
    };


    return (
        <div className="con">
            <div className="content">
                <p className='form-username'>{formData.username}</p>

                <form className="foorm" onSubmit={handleSubmit}>
                    <label className="label" htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name..."
                        className="input"
                    />

                    <label className="label" htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Your age..."
                        className="input"
                    />

                    <label className="label" htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us something about yourself..."
                        className="textarea"
                    />

                    <label className="label" htmlFor="favoriteCuisine">Favorite Cuisine:</label>
                    <select id="favoriteCuisine" name="favoriteCuisine" className="input-create-form" value={formData.cuisine} onChange={handleChange} required>
                        <option value="">Select Cuisine</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                        <option value="French">French</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Thai">Thai</option>
                        <option value="American">American</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Greek">Greek</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Korean">Korean</option>
                        <option value="Other">Other</option>
                    </select>

                    <label className="label" htmlFor="cookingExperience">Cooking Experience:</label>
                    <select
                        id="cookingExperience"
                        name="cookingExperience"
                        value={formData.cookingExperience}
                        onChange={handleChange}
                        className="select"
                    >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <label className="label" htmlFor="instagram">Instagram:</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="Your Instagram profile URL..."
                        className="input"
                    />

                    <button type="submit" className="btnnnn">Save</button>
                </form>
            </div>
        </div>
    );
}
