import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';
import Like from "./Like";
import SaveButton from "./SaveButton";
export default function Cards({ recipeId, title = 'burger', image = 'https://res.cloudinary.com/dzoozuhid/image/upload/v1711165563/rjizkrxiuzlkegkp16s7.jpg', likes, savedBy = 0, cookingTime = 30, ingredients = [1, 2, 3] }) {
  return (
    <Card className="custom-card">
      <div className="image-container">
        <div className="likeandshare">
          <Like recipeId={recipeId} likes={likes} />
          <SaveButton recipeId={recipeId} savedBy={savedBy} />
        </div>
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
