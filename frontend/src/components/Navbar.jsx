import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import logout from '../assets/logout.png';
import './Navbar.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information when component mounts
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            // Fetch user information from backend
            const response = await axios.get('http://localhost:8000/userinfo');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="Navbar">
            <div className='Logo'>
                <img src={logo} alt="" className="logo" />
                <p>CookConnect</p>
            </div>
            <div className={`links ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="linkk">
                    <Link to="/new" className={`link ${location.pathname === "/new" ? "active" : ""}`}>Create</Link>
                    <Link to="/recipes" className={`link ${location.pathname === "/recipes" ? "active" : ""}`}>Explore</Link>
                    <Link to="/saved" className={`link ${location.pathname === "/saved" ? "active" : ""}`}>Saved</Link>
                    <Link to="/feed" className={`link ${location.pathname === "/feed" ? "active" : ""}`}>Feed</Link>
                </div>
                <div className="sandp">
                    <input className="search" type="text" name="search" id="search" placeholder='search...' />
                    {user && user.profilePicture && (
                        <img src={user.profilePicture} className="profile-picture" alt="Profile" />
                    )}
                    <button className='logout' onClick={handleLogout}><img src={logout} className='logout-icon' alt="" /></button>
                </div>
            </div>
        </div>
    );
}
