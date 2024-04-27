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
                    <input
                        type="text"
                        id="favoriteCuisine"
                        name="favoriteCuisine"
                        value={formData.favoriteCuisine}
                        onChange={handleChange}
                        placeholder="Your favorite cuisine..."
                        className="input"
                    />

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

                    <label className="label" htmlFor="allergies">Allergies:</label>
                    <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="Any food allergies..."
                        className="input"
                    />

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

                    <button type="submit" className="btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
