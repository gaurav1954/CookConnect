import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container, Card} from 'react-bootstrap';
import './Categories.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Categories(){
    return(
        <Container className="body">
            <Row className="justify-content-center">
                <Col md={10}>
                <h1><b>Recipe Categories</b></h1>
                </Col>
                <Col md={2} xs="auto">
                <Button className="see-all" href="#" variant="secondary" size="lg"> See All</Button>
                </Col>
            </Row>
            <h4 className="text-muted">Find new and old favorites & top recipe categories.</h4>
            <br/>
            <Row >
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="text-overlay">
            <h4>Breakfast</h4>
          </div>
          </Card>
        </Col>
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <div className="text-overlay">
            <h4>Healthy</h4>
          </div>
          </Card>
        </Col>
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="text-overlay">
            <h4>Salmon</h4>
          </div>
          </Card>
        </Col>
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <div className="text-overlay">
            <h4>Salad</h4>
          </div>
          </Card>
        </Col>
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="text-overlay">
            <h4>Soup</h4>
          </div>
          </Card>
        </Col>
        <Col md={2} className="mb-3">
          <Card className="h-100 zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <div className="text-overlay">
            <h4>Chicken</h4>
            <FontAwesomeIcon icon={faArrowRight} className="forward-icon" size="lg" />
          </div>
          </Card>
        </Col>
      </Row>
        </Container>
    );
}
export default Categories;