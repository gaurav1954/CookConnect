import React from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='Navbar'>
            <div className='Logo'>
                <img src={logo} alt="" className="logo" />
                <p>CookConnect</p>
            </div>
            <div className='links'>
                <ul>
                    <li className={location.pathname === "/new" ? "active" : ""}>
                        <Link to="/new">Create</Link>
                    </li>
                    <li className={location.pathname === "/recipes" ? "active" : ""}>
                        <Link to="/recipes">Explore</Link>
                    </li>
                    <li className={location.pathname === "/saved" ? "active" : ""}>
                        <Link to="/saved">Saved</Link>
                    </li>
                </ul>
                <div>
                    <input className="search" type="text" name="search" id="search" placeholder='search...' />
                </div>
            </div>
            <div className='profile-section'>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
