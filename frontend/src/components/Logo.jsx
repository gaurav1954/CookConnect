import React from 'react';
import logo from '../assets/logo.png';
import './Logo.css';

export default function Logo({ fColor = "black" }) {
    // Dynamically adjust the CSS filter based on fColor
    const imageFilter = fColor === "white" ? "invert(100%)" : "none";

    return (
        <div className='Logo'>
            {/* Apply CSS filter to the image */}
            <img src={logo} alt="" className="logo" style={{ filter: imageFilter }} />
            <p style={{ color: fColor }}>CookConnect</p>
        </div>
    );
}
