import React, { useState } from 'react';
import './Profileform.css'; 

const UserProfile = ({ match }) => {
    const [formData, setFormData] = useState({
        username: 'John',
        name: 'John Doe',
        age: '',
        location: 'New York City, USA',
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="con">
            <div className="content">
                <p className='username'>{formData.username}</p>
                <p className='loc'>Location: {formData.location}</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name..."
                    />

                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Your age..."
                    />

                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us something about yourself..."
                    />

                    <label htmlFor="favoriteCuisine">Favorite Cuisine:</label>
                    <input
                        type="text"
                        id="favoriteCuisine"
                        name="favoriteCuisine"
                        value={formData.favoriteCuisine}
                        onChange={handleChange}
                        placeholder="Your favorite cuisine..."
                    />

                    <label htmlFor="cookingExperience">Cooking Experience:</label>
                    <select
                        id="cookingExperience"
                        name="cookingExperience"
                        value={formData.cookingExperience}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <label htmlFor="allergies">Allergies:</label>
                    <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="Any food allergies..."
                    />

                    <label htmlFor="instagram">Instagram:</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="Your Instagram profile URL..."
                    />

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
