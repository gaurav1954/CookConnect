import React from 'react'
import logo from '../assets/logo.png';
export default function Logo() {
    return (
        <div className='Logo'>
            <img src={logo} alt="" className="logo" />
            <p>CookConnect</p>
        </div>
    )
}
