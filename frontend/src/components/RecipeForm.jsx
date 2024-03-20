import { useState } from "react";
import axios from 'axios';
import './form.css';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        cuisine: 'italian',
        description: '',
        steps: [''], // Initialize with one empty step
        ingredients: '',
        instructions: '',
        cookingTime: '',
        difficultyLevel: '',
        image: null
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'steps') {
            const newSteps = [...formData.steps];
            newSteps[index] = value;
            setFormData({ ...formData, steps: newSteps });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            const newSteps = [...formData.steps];
            newSteps.splice(index + 1, 0, '');
            setFormData({ ...formData, steps: newSteps });
        }
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
            if (key === 'steps') {
                formData.steps.forEach((step, index) => {
                    formDataToSend.append(`${key}[${index}]`, step);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
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
                    steps: [''],
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
                        {formData.steps.map((step, index) => (
                            <input
                                key={index}
                                type="text"
                                name="steps"
                                value={step}
                                onChange={(e) => handleChange(e, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                placeholder="Enter the steps (comma-separated)"
                            />
                        ))}
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
                        <input type="number" name="cookingTime" className="time" value={formData.cookingTime} onChange={handleChange} placeholder="Enter the cooking time (in minutes)" />
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
