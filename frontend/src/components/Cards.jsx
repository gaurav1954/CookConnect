import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';
import Like from "./Like";
export default function Cards({ recipeId, title = 'burger', image = 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180', likes, cookingTime = 30, ingredients = [1, 2, 3] }) {

  return (
    <Card className="custom-card">
      <div className="image-container">
        <Like recipeId={recipeId} likes={likes} />
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
