import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        cuisine: 'italian', // Defaulting to Italian cuisine
        description: '',
        steps: [],
        ingredients: [],
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
                    steps: [],
                    ingredients: [],
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
        <div className="container">
            <h1>Add Recipe</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Give your recipe a name" />
                </Form.Group>
                <Form.Group controlId="cuisine">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Select name="cuisine" value={formData.cuisine} onChange={handleChange}>
                        <option value="italian">Italian</option>
                        <option value="chinese">Chinese</option>
                        <option value="mexican">Mexican</option>
                        <option value="thai">Thai</option>
                        <option value="japanese">Japanese</option>
                        <option value="north-indian">North Indian</option>
                        <option value="south-indian">South Indian</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..." />
                </Form.Group>
                <Form.Group controlId="steps">
                    <Form.Label>Steps</Form.Label>
                    <Form.Control type="text" name="steps" value={formData.steps} onChange={handleChange} placeholder="Enter the steps (comma-separated)" />
                </Form.Group>
                <Form.Group controlId="ingredients">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Enter the ingredients (comma-separated)" />
                </Form.Group>
                <Form.Group controlId="instructions">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control as="textarea" rows={3} name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Enter the instructions" />
                </Form.Group>
                <Form.Group controlId="cookingTime">
                    <Form.Label>Cooking Time</Form.Label>
                    <Form.Control type="number" name="cookingTime" value={formData.cookingTime} onChange={handleChange} placeholder="Enter the cooking time (in minutes)" />
                </Form.Group>
                <Form.Group controlId="difficultyLevel">
                    <Form.Label>Difficulty Level</Form.Label>
                    <Form.Control as="select" name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Difficult">Difficult</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={handleSave}>Save</Button>
            </Form>
        </div>
    );
};

export default RecipeForm;
