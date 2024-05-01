import React from 'react';
import './PROFILE_INFO.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function PROFILE_INFO() {
    return (
        <div>
            <div className='profile-container'>
                <div className="profile-details">
                    <h2 className='profile-name'>Kanishka</h2>
                    <div className="alignment">
                        <span className='profile-age'>Age: 20</span>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className='profile-icon' /><span> Dehradun, Uttrakhand</span>
                    </div>
                    <h4 style={{ color: 'orange', fontSize: '20px' }}>Bio:</h4>
                    <div className='profile-alignment'>
                        <FontAwesomeIcon icon={faUtensils} className='profile-icon' /><span className='profile-fav_cuisine'>Favorite Cuisine: Indian</span><span>Cooking Experience: </span><span className='profile-cooking_exp'>Noob</span>
                    </div>
                    <div className='profile-allergies'>
                        <FontAwesomeIcon icon={faAllergies} className='profile-icon' />
                        <span>Allergies:</span>
                        <span className='profile-answer'>Dry Fruits</span>
                    </div>
                    <div className='profile-insta'>
                        <FontAwesomeIcon icon={faInstagram} className='profile-icon' />
                        <span>kanishka Singh</span>
                    </div>
                </div>
                <div>
                    <img className="profile-pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                </div>
                <br></br>
            </div>
            <hr className='profile-division' />
            <div>
                <h1 className='profile-created'>Created</h1>
                <h3 className='profile-no_recipe_text'>No recipes published just yet!</h3>
                <div><FontAwesomeIcon icon={faPlusCircle} className="profile-plus-icon" /></div>
            </div>
        </div>
    )
}
export default PROFILE_INFO;
