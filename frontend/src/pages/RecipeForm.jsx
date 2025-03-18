"use client";

import { useState } from "react";
import "./RecipeForm.css";
import Spinner from "../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faUtensils,
  faClock,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    cuisine: "Italian",
    description: "",
    steps: [""], // Initialize with one empty step
    ingredients: [""], // Changed to array for better UX
    cookingTime: "",
    difficultyLevel: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const steps = [
    { name: "Basic Info", fields: ["title", "cuisine", "description"] },
    { name: "Ingredients", fields: ["ingredients"] },
    { name: "Steps", fields: ["steps"] },
    { name: "Details", fields: ["cookingTime", "difficultyLevel", "image"] },
  ];

  const validateStep = (step) => {
    const newErrors = {};
    const fields = steps[step].fields;

    fields.forEach((field) => {
      if (field === "title" && !formData.title.trim()) {
        newErrors.title = "Title is required";
      }
      if (field === "description" && !formData.description.trim()) {
        newErrors.description = "Description is required";
      }
      if (
        field === "ingredients" &&
        formData.ingredients.every((ing) => !ing.trim())
      ) {
        newErrors.ingredients = "At least one ingredient is required";
      }
      if (field === "steps" && formData.steps.every((step) => !step.trim())) {
        newErrors.steps = "At least one step is required";
      }
      if (field === "cookingTime" && !formData.cookingTime) {
        newErrors.cookingTime = "Cooking time is required";
      }
      if (field === "difficultyLevel" && !formData.difficultyLevel) {
        newErrors.difficultyLevel = "Difficulty level is required";
      }
      if (field === "image" && !formData.image && currentStep === 3) {
        newErrors.image = "Image is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "steps") {
      const newSteps = [...formData.steps];
      newSteps[index] = value;
      setFormData({ ...formData, steps: newSteps });
    } else if (name === "ingredients") {
      const newIngredients = [...formData.ingredients];
      newIngredients[index] = value;
      setFormData({ ...formData, ingredients: newIngredients });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addItem = (type) => {
    if (type === "steps") {
      setFormData({ ...formData, steps: [...formData.steps, ""] });
    } else if (type === "ingredients") {
      setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
    }
  };

  const removeItem = (type, index) => {
    if (type === "steps") {
      const newSteps = [...formData.steps];
      newSteps.splice(index, 1);
      if (newSteps.length === 0) newSteps.push("");
      setFormData({ ...formData, steps: newSteps });
    } else if (type === "ingredients") {
      const newIngredients = [...formData.ingredients];
      newIngredients.splice(index, 1);
      if (newIngredients.length === 0) newIngredients.push("");
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();

    // Append form data fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("cuisine", formData.cuisine);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("cookingTime", formData.cookingTime);
    formDataToSend.append("difficultyLevel", formData.difficultyLevel);

    // Append steps and ingredients (filtering out empty ones)
    formData.steps
      .filter((step) => step.trim())
      .forEach((step, index) => {
        formDataToSend.append(`steps[${index}]`, step);
      });

    // Join ingredients into a comma-separated string
    formDataToSend.append(
      "ingredients",
      formData.ingredients.filter((ing) => ing.trim()).join(",")
    );

    // Append image
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/recipes/create`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );

      if (response.ok) {
        // Reset form state
        setFormData({
          title: "",
          cuisine: "Italian",
          description: "",
          steps: [""],
          ingredients: [""],
          cookingTime: "",
          difficultyLevel: "",
          image: null,
        });
        setImagePreview(null);
        setCurrentStep(0);
        alert("Recipe created successfully!");
      } else {
        alert("Failed to create recipe.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="step-title">Basic Information</h2>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className={`input-create-form ${
                  errors.title ? "error-input" : ""
                }`}
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your recipe a name"
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label>Cuisine</label>
              <select
                name="cuisine"
                className="input-create-form"
                value={formData.cuisine}
                onChange={handleChange}
              >
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
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={5}
                className={`input-create-form ${
                  errors.description ? "error-input" : ""
                }`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
              />
              {errors.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="step-title">Ingredients</h2>
            <p className="step-description">
              List all ingredients needed for your recipe
            </p>

            {errors.ingredients && (
              <div className="error-message">{errors.ingredients}</div>
            )}

            <div className="ingredients-list">
              {formData.ingredients.map((ingredient, index) => (
                <div className="ingredient-item" key={index}>
                  <input
                    type="text"
                    className="input-create-form"
                    name="ingredients"
                    value={ingredient}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Ingredient ${index + 1}`}
                  />

                  <motion.button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem("ingredients", index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={formData.ingredients.length === 1}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </motion.button>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              className="add-btn"
              onClick={() => addItem("ingredients")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Ingredient
            </motion.button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="step-title">Preparation Steps</h2>
            <p className="step-description">
              Describe how to prepare your recipe step by step
            </p>

            {errors.steps && (
              <div className="error-message">{errors.steps}</div>
            )}

            <div className="steps-list">
              {formData.steps.map((step, index) => (
                <div className="step-item" key={index}>
                  <div className="step-number">{index + 1}</div>
                  <textarea
                    className="input-create-form step-input"
                    name="steps"
                    value={step}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Describe step ${index + 1}`}
                    rows={3}
                  />

                  <motion.button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem("steps", index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={formData.steps.length === 1}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </motion.button>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              className="add-btn"
              onClick={() => addItem("steps")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Step
            </motion.button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="step-title">Final Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FontAwesomeIcon icon={faClock} className="form-icon" />
                  Cooking Time (mins)
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  className={`input-create-form ${
                    errors.cookingTime ? "error-input" : ""
                  }`}
                  value={formData.cookingTime}
                  onChange={handleChange}
                  placeholder="Enter cooking time"
                />
                {errors.cookingTime && (
                  <div className="error-message">{errors.cookingTime}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FontAwesomeIcon icon={faUtensils} className="form-icon" />
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  className={`input-create-form ${
                    errors.difficultyLevel ? "error-input" : ""
                  }`}
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </select>
                {errors.difficultyLevel && (
                  <div className="error-message">{errors.difficultyLevel}</div>
                )}
              </div>
            </div>

            <div className="form-group image-upload-group">
              <label>
                <FontAwesomeIcon icon={faImage} className="form-icon" />
                Recipe Image
              </label>

              <div className="image-upload-container">
                <div
                  className={`image-upload-area ${
                    errors.image ? "error-input" : ""
                  }`}
                >
                  {imagePreview ? (
                    <div className="image-preview">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Recipe preview"
                      />
                      <button
                        type="button"
                        className="change-image-btn"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, image: null });
                          document.getElementById("image-upload").value = "";
                        }}
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="upload-label">
                      <FontAwesomeIcon icon={faImage} size="2x" />
                      <span>Click to upload an image</span>
                      <input
                        type="file"
                        id="image-upload"
                        className="input-file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
                {errors.image && (
                  <div className="error-message">{errors.image}</div>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="recipe-form-container">
      <div className="form-progress">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${
              currentStep === index ? "active" : ""
            } ${currentStep > index ? "completed" : ""}`}
            onClick={() => {
              if (currentStep > index || validateStep(currentStep)) {
                setCurrentStep(index);
              }
            }}
          >
            <div className="step-indicator">{index + 1}</div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
      </div>

      <div className="recipe-form-content">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          <div className="form-navigation">
            {currentStep > 0 && (
              <motion.button
                type="button"
                className="nav-btn back"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            )}

            {currentStep < steps.length - 1 ? (
              <motion.button
                type="button"
                className="nav-btn next"
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="nav-btn submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Recipe
              </motion.button>
            )}
          </div>
        </form>
      </div>

      {isLoading && <Spinner />}
    </div>
  );
};

export default RecipeForm;
