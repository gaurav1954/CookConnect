import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card} from 'react-bootstrap';
import './Categories.css'

function Categories(){
    return(
        <Container className="body">
        <div className="types">
          <Card className="zoom-effect">
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=2888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="text-overlay">
            <h4>Breakfast</h4>
          </div>
          </Card>
          </div>
        </Container>
    );
}
export default Categories;