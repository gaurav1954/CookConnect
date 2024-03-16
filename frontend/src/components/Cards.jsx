import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';

function Cards() {
  return (
    <Card className="custom-card">
      <div className="image-container">
        <Button variant="light-danger" className="like-button">
          <FontAwesomeIcon icon={faThumbsUp} /> <b>75%</b>
        </Button>
        <Button variant="light-solid" className="bookmark-button">
          <FontAwesomeIcon icon={faBookmark} /> <b>33</b>
        </Button>
        <Card.Img
          className="card-image"
          src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180"
          alt="Card image"
        />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </div>
      <Card.Body>
        <Card.Title>Stuffed Pizza Slider</Card.Title>
        <Card.Text className="card-text">
          <div className="ingredients">4 ingredients</div>
          <div className="time">30 mins</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
