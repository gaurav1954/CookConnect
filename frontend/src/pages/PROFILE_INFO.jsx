import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './PROFILE_INFO.css'
import Cards from '../components/Cards';

function PROFILE_INFO() {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user-info`, {
                    method: 'GET',
                    credentials: 'include' // Include credentials
                });
                const data = await response.json();
                setUserData(data);
                setIsLoading(false); // Assuming the user data is returned directly
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchData(); // Move setInitialRender inside the conditional block
    }, []);

    function goToProfleFrom() {
        navigate('/profile-form', { state: { username: username } });
    }
    const { name, age, location, bio, allergies, username, created, favoriteCuisine, cookingExperience, instagram, profileImage, _id } = userData;

    return (
        <div className='profile-outermost-container'>
            <div className='profile-container'>
                <div className="profile-details">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p className='profile-name'>{name}</p>
                        <div style={{ marginLeft: "auto" }}>
                            <FontAwesomeIcon icon={faPenToSquare} size='lg' onClick={goToProfleFrom} /></div>
                    </div>
                    <div className="alignment">
                        <div className='profile-age'>Age: {age || 'N/A'}</div>
                        <div className="profile-location">
                            <FontAwesomeIcon icon={faMapMarkerAlt} size='2xs' className='profile-icon lo' />
                            <div>{location || 'N/A'}</div>
                        </div>
                    </div>
                    <div className="profile-biooo">{bio || 'N/A'}</div>
                    <div className='profile-alignment'>
                        <div className="cuisine-profile">
                            <FontAwesomeIcon icon={faUtensils} className='profile-icon' />
                            <div className='profile-fav_cuisine'>Favorite Cuisine: {favoriteCuisine || 'N/A'}</div>

                        </div>
                        <div>Cooking Experience: {cookingExperience || 'N/A'}</div>
                    </div>
                    <div className='profile-allergies'>
                        <FontAwesomeIcon icon={faAllergies} className='profile-icon' />
                        <span>Allergies:</span>
                        <span className='profile-answer'>{allergies || 'N/A'}</span>
                    </div>
                    <div className='profile-insta'>
                        <FontAwesomeIcon icon={faInstagram} className='profile-icon' />
                        <span>{instagram || 'N/A'}</span>
                    </div>
                </div>
                <div className='profile-image-profile'>
                    <img className="profile-pic" src={profileImage}
                        style={{ objectFit: "cover", alignContent: "center" }}
                        alt="Profile" />
                </div>
            </div>
            <div className='created-posts-profile'>
                <h1 className='profile-created'>Straight from {name}'s kitchen</h1>
                <div className='created-container'>
                    {created && created.length > 0 ? (
                        created.map(recipe => (
                            <Cards recipeId={recipe._id} key={recipe._id} {...recipe} ></Cards>
                        ))
                    ) : (
                        <p>No created recipes found</p>
                    )}
                </div>
            </div>
        </div >
    );
}

export default PROFILE_INFO;