import { useState } from "react";
import axios from 'axios';
import './form.css';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        cuisine: 'italian', // Defaulting to Italian cuisine
        description: '',
        steps: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
        difficultyLevel: '',
        image: null // Initialize image as null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append form data fields
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            const response = await axios.post('http://localhost:8000/recipes/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                alert("Recipe created successfully!");
                setFormData({
                    title: '',
                    cuisine: 'italian',
                    description: '',
                    steps: '',
                    ingredients: '',
                    instructions: '',
                    cookingTime: '',
                    difficultyLevel: '',
                    image: null
                });
            } else {
                alert("Failed to create recipe.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while creating recipe.");
        }
    };

    const handleSave = () => {
        if (window.confirm("Are you sure you want to create a recipe?")) {
            handleSubmit();
        }
    };

    return (
        <div className="outerer-container">
        <div className="container">
            <h1 className='adding'>Add Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Give your recipe a name" />
                </div>
                <div className="form-group">
                    <label>Cuisine</label>
                    <select name="cuisine" value={formData.cuisine} onChange={handleChange}>
                        <option value="italian">Italian</option>
                        <option value="chinese">Chinese</option>
                        <option value="mexican">Mexican</option>
                        <option value="thai">Thai</option>
                        <option value="japanese">Japanese</option>
                        <option value="north-indian">North Indian</option>
                        <option value="south-indian">South Indian</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..." />
                </div>
                <div className="form-group">
                    <label>Steps</label>
                    <input type="text" name="steps" value={formData.steps} onChange={handleChange} placeholder="Enter the steps (comma-separated)" />
                </div>
                <div className="form-group">
                    <label>Ingredients</label>
                    <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Enter the ingredients (comma-separated)" />
                </div>
                <div className="form-group">
                    <label>Instructions</label>
                    <textarea rows={3} name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Enter the instructions" />
                </div>
                <div className="form-group">
                    <label>Cooking Time</label>
                    <input type="number" name="cookingTime" value={formData.cookingTime} onChange={handleChange} placeholder="Enter the cooking time (in minutes)" />
                </div>
                <div className="form-group">
                    <label>Difficulty Level</label>
                    <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Difficult">Difficult</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit" onClick={handleSave}>Save</button>
            </form>
            </div>
        </div>
    );
};

export default RecipeForm;
