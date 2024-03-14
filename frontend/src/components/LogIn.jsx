import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import './LS.css';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {  
        // Assuming successful login redirects to home page
        navigate('/recepies');
      } else {
        // Handle other cases, e.g., display an error message
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
        </div>
        <div className="input">
          <img src={pass_icon} alt="" />
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">Login</button>
        </div>
      </form>
    </div>
  );
};