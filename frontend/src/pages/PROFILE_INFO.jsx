"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faUtensils,
  faAllergies,
  faPenToSquare,
  faSave,
  faTimes,
  faCamera,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./PROFILE_INFO.css";
import Cards from "../components/Cards";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

function PROFILE_INFO() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("recipes");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/auth/user-info`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserData(data);

      // Set form values
      Object.keys(data).forEach((key) => {
        if (key !== "profileImage" && key !== "created" && key !== "_id") {
          setValue(key, data[key]);
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form data
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append image if changed
    if (newImage) {
      formData.append("profileImage", newImage);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API_URL}/auth/update-info`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setEditImage(false);
        setNewImage(null);
        setImagePreview(null);
        fetchUserData();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating profile.");
    }
  };

  const {
    name,
    age,
    location,
    bio,
    allergies,
    username,
    created = [],
    favoriteCuisine,
    cookingExperience,
    instagram,
    profileImage,
  } = userData;

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-hero">
        <div className="profile-cover-gradient"></div>
        <div className="profile-hero-content">
          <motion.div
            className="profile-image-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {editImage || isEditing ? (
              <div className="profile-image-edit">
                <img
                  className="profile-pic"
                  src={imagePreview || profileImage}
                  alt="Profile"
                />
                <div className="profile-image-overlay">
                  <label
                    htmlFor="profile-image-upload"
                    className="profile-image-upload-label"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                    <span>Change Photo</span>
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-image-upload"
                  />
                </div>
              </div>
            ) : (
              <motion.img
                className="profile-pic"
                src={profileImage}
                alt="Profile"
                whileHover={{ scale: 1.05 }}
                onClick={() => setEditImage(true)}
              />
            )}
          </motion.div>

          <div className="profile-hero-info">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing-name"
                  className="profile-name-edit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="profile-edit-input large"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                  )}
                </motion.div>
              ) : (
                <motion.h1
                  key="display-name"
                  className="profile-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {name || username || "Add your name"}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="profile-username">@{username}</div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <motion.button
                  className="profile-edit-btn save"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <FontAwesomeIcon icon={faSave} /> Save
                </motion.button>
                <motion.button
                  className="profile-edit-btn cancel"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsEditing(false);
                    setEditImage(false);
                    setImagePreview(null);
                    fetchUserData();
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                className="profile-edit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>About</span>
          </button>
          <button
            className={`profile-tab ${activeTab === "recipes" ? "active" : ""}`}
            onClick={() => setActiveTab("recipes")}
          >
            <FontAwesomeIcon icon={faUtensils} />
            <span>Recipes</span>
            <span className="tab-count">{created.length}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "about" ? (
            <motion.div
              key="about-tab"
              className="profile-about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-section">
                <h2 className="profile-section-title">Bio</h2>
                {isEditing ? (
                  <textarea
                    {...register("bio")}
                    className="profile-edit-textarea"
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="profile-bio">{bio || "No bio added yet"}</p>
                )}
              </div>

              <div className="profile-section">
                <h2 className="profile-section-title">Personal Information</h2>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="profile-info-icon"
                      />
                      Age
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <input
                          type="number"
                          {...register("age")}
                          className="profile-edit-input small"
                          placeholder="Your age"
                        />
                      ) : (
                        age || "Not specified"
                      )}
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="profile-info-icon"
                      />
                      Location
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <input
                          {...register("location")}
                          className="profile-edit-input"
                          placeholder="Your location"
                        />
                      ) : (
                        location || "Not specified"
                      )}
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="profile-info-icon"
                      />
                      Favorite Cuisine
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <select
                          {...register("favoriteCuisine")}
                          className="profile-edit-select"
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
                      ) : (
                        favoriteCuisine || "Not specified"
                      )}
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="profile-info-icon"
                      />
                      Cooking Experience
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <select
                          {...register("cookingExperience")}
                          className="profile-edit-select"
                        >
                          <option value="">Select Experience</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      ) : (
                        cookingExperience || "Not specified"
                      )}
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faAllergies}
                        className="profile-info-icon"
                      />
                      Allergies
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <input
                          {...register("allergies")}
                          className="profile-edit-input"
                          placeholder="Any allergies?"
                        />
                      ) : (
                        allergies || "None"
                      )}
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="profile-info-label">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="profile-info-icon"
                      />
                      Instagram
                    </div>
                    <div className="profile-info-value">
                      {isEditing ? (
                        <input
                          {...register("instagram")}
                          className="profile-edit-input"
                          placeholder="Your Instagram handle"
                        />
                      ) : instagram ? (
                        <a
                          href={
                            instagram.startsWith("http")
                              ? instagram
                              : `https://instagram.com/${instagram}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="profile-social-link"
                        >
                          {instagram}
                        </a>
                      ) : (
                        "Not linked"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recipes-tab"
              className="profile-recipes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="profile-section-title">
                <span className="highlight">Recipes</span> by {name || username}
              </h2>

              {created && created.length > 0 ? (
                <div className="recipes-grid">
                  {created.map((recipe, index) => (
                    <motion.div
                      key={recipe._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="recipe-card-wrapper"
                    >
                      <Cards recipeId={recipe._id} {...recipe} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="no-recipes"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="no-recipes-icon"
                  />
                  <h3>No recipes yet</h3>
                  <p>Share your culinary creations with the world!</p>
                  <motion.button
                    className="create-recipe-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/new")}
                  >
                    Create Your First Recipe
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default PROFILE_INFO;
