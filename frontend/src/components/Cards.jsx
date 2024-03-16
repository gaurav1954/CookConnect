import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Cards() {
  return (
    <div className="container">
    <container>
      <Row className="container">
        <Col md={3} sm={6}>
    <Card className="custom-card" style={{ width: '18rem' }}>
    <div className="image-container">
    <Button variant="light-danger" className="like-button">
          <FontAwesomeIcon icon={faThumbsUp} /> <b>75%</b>
        </Button>
        <Button variant="light-solid"className="bookmark-button">
        <FontAwesomeIcon icon={faBookmark} /> <b>33</b>
        </Button>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180"  />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        </div>
      <Card.Body>
        <Card.Title>Stuffed Pizza Slider</Card.Title>
        <Card.Text>
          <b>5 ingredints . 30 mins</b>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col md={3} sm={6}>
    <Card className="custom-card" style={{ width: '18rem' }}>
    <div className="image-container">
    <Button variant="light-danger" className="like-button">
          <FontAwesomeIcon icon={faThumbsUp} /> <b>99%</b>
        </Button>
        <Button variant="light-solid"className="bookmark-button">
        <FontAwesomeIcon icon={faBookmark} /> <b>68</b>
        </Button>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180"  />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        </div>
      <Card.Body>
        <Card.Title>Sandwich with Boiled Eggs</Card.Title>
        <Card.Text>
          <b>12 ingredients . 20 mins</b>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col md={3} sm={6}>
    <Card className="custom-card"  style={{ width: '18rem' }}>
    <div className="image-container">
    <Button variant="light-danger" className="like-button">
          <FontAwesomeIcon icon={faThumbsUp} /> <b>90%</b>
        </Button>
        <Button variant="light-solid"className="bookmark-button">
        <FontAwesomeIcon icon={faBookmark} /> <b>29</b>
        </Button>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180"  />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        </div>
      <Card.Body>
        <Card.Title>Burger</Card.Title>
        <Card.Text>
          <b>9 ingredients . 25 mins</b>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col md={3} sm={6}>
    <Card className="custom-card"  style={{ width: '18rem' }}>
    <div className="image-container">
    <Button variant="light-danger" className="like-button">
          <FontAwesomeIcon icon={faThumbsUp} /> <b>56%</b>
        </Button>
        <Button variant="light-solid"className="bookmark-button">
        <FontAwesomeIcon icon={faBookmark} /> <b>9</b>
        </Button>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/100px180"  />
        <div className="menu-icon">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        </div>
      <Card.Body>
        <Card.Title>Fruit Salad</Card.Title>
        <Card.Text>
          <b>9 ingredients . 18 mins</b>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    </Row>
    <br/>
    </container>
    </div>
  );
}

export default Cards;