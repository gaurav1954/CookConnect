import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LS.css';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [err, setError] = useState(""); // Initialize the error state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      username: '',
      password: ''
    });

    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        // Assuming successful login redirects to home page
        navigate('/recipes');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password. Please try again."); // Set the error message
      } else {
        setError("An error occurred. Please try again."); // Set a generic error message
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRedirect = () => {
    navigate('/signup')
  }

  return (
    <div className="outer-container">
      <div className='containerr-log border-2'>
        <div className='header'>
          <div className="headText ">Log in</div>
        </div>
        <form className="inputss" onSubmit={handleSubmit}>
          <div className={`inputt`}>
            <img src={user_icon} alt="" />
            <input type="text" name="username" placeholder='Name' value={formData.username} onChange={handleChange} />
          </div>
          <div className="inputt">
            <img src={pass_icon} alt="" />
            <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
          </div>
          <div className="sub-con">
            <button type="submit" className="submit-btn btnn" onClick={handleSubmit}>Login</button>
          </div>
        </form>
        <div className="sign-con">
          <p>Don't have an account?</p>
          <button onClick={handleRedirect} className="login-btn btnn">Signup</button>
        </div>


      </div>
    </div>

  );
}
