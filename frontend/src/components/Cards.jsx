import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';
import axios from 'axios';

export default function Cards({ recipeId, title = 'burger', image = 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180', likes = 20, cookingTime = 30, ingredients = [1, 2, 3] }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeClick = async () => {
    try {
      const apiUrl = 'http://localhost:8000/recipes'; // API base URL
      console.log(recipeId)
      if (liked) {
        // Unlike the recipe
        await axios.post(`${apiUrl}/unlike/${recipeId}`);
        setLikeCount(likeCount - 1);
      } else {
        // Like the recipe
        await axios.post(`${apiUrl}/like/${recipeId}`);
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  return (
    <Card className="custom-card">
      <div className="image-container">
        <Button variant="light-danger" className="like-button" onClick={handleLikeClick}>
          <FontAwesomeIcon icon={faThumbsUp} /> <b>{likeCount}</b>
        </Button>
        <Button variant="light-solid" className="bookmark-button">
          <FontAwesomeIcon icon={faBookmark} /> <b>33</b>
        </Button>
        <Card.Img
          src={image}
          alt="Card image"
        />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </div>
      <Card.Body >
        <Card.Title className="title">{title}</Card.Title>
        <div className="card-text">
          <div className="ingredients">{ingredients.length} ingredients</div>
          <div className="re-time">{cookingTime} mins</div>
        </div>
      </Card.Body>
    </Card>
  );
}
