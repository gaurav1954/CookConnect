import React from 'react'
import logo from '../assets/logo.png'
import './Navbar.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className='Navbar'>
            <div className='Logo'>
                <img src={logo} alt="" className="logo" />
                <p>CookConnect</p>
            </div>
            <div className='links'>
                <ul>
                    <li>
                        <Link to="/new">Create</Link>
                    </li>
                    <li>
                        <Link to="/recipes">Explore</Link>
                    </li>
                    <li>
                        <Link to="/new">Saved</Link>
                    </li>

                </ul>
                <div >
                    <input className="search" type="text" name="search" id="search" placeholder='search...' />
                </div>
            </div>
            <div className='profile-section'>
                <button className='logout'>Logout</button>
            </div>
        </div>
    )
}
