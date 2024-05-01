import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import logout from '../assets/logout.png';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="Navbar">
            <Logo></Logo>
            <div className={`links`}>
                <div className="linkk">
                    <Link to="/new" className={`link ${location.pathname === "/new" ? "active" : ""}`}>Create</Link>
                    <Link to="/recipes" className={`link ${location.pathname === "/recipes" ? "active" : ""}`}>Explore</Link>
                    <Link to="/saved" className={`link ${location.pathname === "/saved" ? "active" : ""}`}>Saved</Link>
                    <Link to="/feed" className={`link ${location.pathname === "/feed" ? "active" : ""}`}>Feed</Link>
                </div>
                <div className="sandp">
                    <Link to="/profile" className={`link ${location.pathname === "/profile" ? "active" : ""}`}><FontAwesomeIcon icon={faUser} size='xl' /></Link>
                    <button className='logout' onClick={handleLogout}><img src={logout} className='logout-icon' alt="" /></button>
                </div>
            </div>
        </div>
    );
}
