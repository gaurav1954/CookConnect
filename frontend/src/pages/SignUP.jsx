import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SingUp.css';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';
import email_icon from '../assets/email.png';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [registeredUsernames, setRegisteredUsernames] = useState([]);
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch registered usernames and emails from the server
    const fetchRegisteredData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/registeredData');
        setRegisteredUsernames(response.data.usernames);
        setRegisteredEmails(response.data.emails);
      } catch (error) {
        console.error('Error fetching registered data:', error.message);
      }
    };
    fetchRegisteredData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if username and email are unique
    if (isUsernameUnique && isEmailUnique) {
      try {
        const response = await axios.post('http://localhost:8000/signup', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          navigate('/login');
        } else {
          console.log('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.log('Username or email is not unique.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check username uniqueness
    setIsUsernameUnique(!registeredUsernames.includes(formData.username));

    // Check email uniqueness
    setIsEmailUnique(!registeredEmails.includes(formData.email));

  };

  const redirectToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="container-wrapperr">
      <div className='containerr-sign '>
        <div className='header'>
          <div className="headText orange">Sign Up</div>
        </div>
        <form className="inputss" onSubmit={handleSubmit}>
          <div className={`inputt ${!isUsernameUnique ? 'not-unique' : ''}`}>
            <img src={user_icon} alt="" />
            <input type="text" name="username" placeholder='Name' value={formData.username} onChange={handleChange} />
          </div>
          {!isUsernameUnique && <div className="val-error">Username is not available</div>}
          <div className={`inputt ${!isEmailUnique ? 'not-unique' : ''}`}>
            <img src={email_icon} alt="" />
            <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
          </div>
          {!isEmailUnique && <div className="val-error">Email is already registered</div>}
          <div className="inputt">
            <img src={pass_icon} alt="" />
            <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
          </div>
          <div className="sub-con">
            <button type="submit" className="submit-btn btnn" onClick={handleSubmit} disabled={!isUsernameUnique || !isEmailUnique}>Sign-up</button>
          </div>
        </form>
        <div className="log-con">
          <p>Already have an account?</p>
          <button onClick={redirectToLoginPage} className="login-btn btnn">Login</button>
        </div>


      </div>
    </div>

  );



};