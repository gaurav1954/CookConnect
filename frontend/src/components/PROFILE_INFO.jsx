import REACT from 'react';
import './PROFILE_INFO.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons'; 
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function PROFILE_INFO(){
    return(
        <div>
            <div className='container'>
            <div className="details">
                <h2>Kanishka</h2>
                <div className="alignment">
                <span className='age'>Age: 20</span>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='icon'/><span> Dehradun, Uttrakhand</span>
                </div>
                <h4 style={{color: 'orange', fontSize: '20px'}}>Bio:</h4>
                <div className='alignment'>
                <FontAwesomeIcon icon={faUtensils} className='icon'/><span className='fav_cuisine'>Favorite Cuisine: Indian</span><span>Cooking Experience: </span><span className='cooking_exp'>Noob</span>
                </div>
                <div className='allergies'>
                <FontAwesomeIcon icon={faAllergies} className='icon'/>
                    <span>Allergies:</span>
                    <span className='answer'>Dry Fruits</span>
                </div>
                <div className='insta'>
                <FontAwesomeIcon icon={faInstagram} className='icon'/>
                    <span>kanishka Singh</span>
                </div>
            </div>
            <div>
            <img className="pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
            </div>
            <br></br>
            </div>
            <hr className='division'/>
            <div>
                <h1 className='created'>Created</h1>
                <h3 className='no_recipe_text'>No recipes published just yet!</h3>
                <div><FontAwesomeIcon icon={faPlusCircle} className="plus-icon" /></div>
            </div>
        </div>
    )
}
export default PROFILE_INFO