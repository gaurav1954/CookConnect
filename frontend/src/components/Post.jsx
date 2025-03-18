"use client";
import "./Post.css";
import Like from "./Like";
import SaveButton from "./SaveButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Post({
  author = "anonymous",
  recipeId = "65f5deae39d4d5ebd8dd729c",
  savedBy,
  likes,
  description = "xys",
  image,
  title,
  cookingTime,
  difficultyLevel,
  cuisine,
}) {
  const navigate = useNavigate();

  const goToDetailedPage = () => {
    navigate("/post", { state: { recipeId: recipeId } });
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <motion.div
      className="post-container"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">
            {author.profileImage ? (
              <img
                src={author.profileImage || "/placeholder.svg"}
                alt={author.username}
              />
            ) : (
              <div className="post-avatar-placeholder">
                {author.username ? author.username[0].toUpperCase() : "A"}
              </div>
            )}
          </div>
          <div className="post-user-details">
            <div className="post-username">
              {author.username || "Anonymous"}
            </div>
            {cuisine && <div className="post-cuisine">#{cuisine}</div>}
          </div>
        </div>
      </div>

      <div className="post-image-container" onClick={goToDetailedPage}>
        <img
          src={image || "/placeholder.svg"}
          className="post-image"
          alt={title}
        />
        <div className="post-image-overlay">
          <h2 className="post-title">{title}</h2>
        </div>
      </div>

      <div className="post-actions">
        <div className="post-action-buttons">
          <Like likes={likes} recipeId={recipeId} />
          <SaveButton recipeId={recipeId} savedBy={savedBy} />
        </div>

        {(cookingTime || difficultyLevel) && (
          <div className="post-meta">
            {cookingTime && (
              <div className="post-meta-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{cookingTime} mins</span>
              </div>
            )}
            {difficultyLevel && (
              <div className="post-meta-item">
                <FontAwesomeIcon icon={faUtensils} />
                <span>{difficultyLevel}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">
        <p className="post-description">{truncateDescription(description)}</p>
        {description && description.length > 150 && (
          <button className="read-more" onClick={goToDetailedPage}>
            Read more
          </button>
        )}
      </div>
    </motion.div>
  );
}
