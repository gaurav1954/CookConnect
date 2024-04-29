import REACT from 'react';
import './PROFILE_INFO.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function PROFILE_INFO() {
    return (
        <div>
            <div className='containerrrr'>
                <div className="profle-details">
                    <h3>Name: Kanishka</h3>
                    <h3>Age: 20</h3>
                    <h3>Location: Dehradun, Uttrakhand</h3>
                    <h3>Bio:</h3>
                    <h3>Favourite Cuisine: Indian</h3>
                    <h3>Cooking Experience: Noob</h3>
                    <h3>Allergies: Dry fruits</h3>
                    <h3>Instagram:</h3>
                </div>
                <div>
                    <img className="profile-pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                </div>
                <br></br>
            </div>
            <hr className='division' />
            <div>
                <h1 className='created'>Created</h1>
                <h3 className='no_recipe_text'>No recipes published just yet!</h3>
                <div><FontAwesomeIcon icon={faPlusCircle} className="plus-icon" /></div>
            </div>
        </div>
    )
}
export default PROFILE_INFO