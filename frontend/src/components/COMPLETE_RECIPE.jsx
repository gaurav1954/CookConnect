import React, { useEffect, useState } from 'react';
import './COMPLETE_RECIPE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faBookmark, faCircleMinus, faCirclePlus, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Step from './Step';

function COMPLETE_RECIPE() {
  const location = useLocation();
  const recipeId = location.state.recipeId;

  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recipes/info/${recipeId}`, {
          method: 'GET',
          credentials: 'include' // Include credentials
        });
        const data = await response.json();
        setRecipeData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  const { image, likes, author, savedBy, title, description, cuisine, steps } = recipeData;
  return (
    <>{isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        <div className='complete-recipe-container'>
          <div className='complete-recipe-row'>
            <div className='complete-recipe-col'>
              <img src={image} className='recipe-imgg' />
            </div>
            <div className='complete-recipe-col-1'>
              <div className="dish-name">
                <h1>{title} </h1>
                <div className='re-author'>-{author.username}</div>
              </div>
              <p className='customization note'>{description}</p>
              <div className="cuisine-type">
                {cuisine}
              </div>

              <div className='input-review'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Icon" className="profile-icon" />
                <input type="text" className='revieww' placeholder='What do you think about this recipe?' />
              </div>

              <div className="likeAndSave">
                <div className='Save-count'>
                  <FontAwesomeIcon icon={faBookmark} className='save-count-icon icon' />
                  <div className="save-count">{likes}</div>
                </div>
                <div className='Like-count'>
                  <FontAwesomeIcon icon={faThumbsUp} className='like-count-icon icon' />
                  <div className="like-count">{savedBy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='complete-recipe-container'>
          <div className='complete-recipe-row step-row'>
            {steps.map((step, index) => (
              <Step stepkey={index + 1} data={step}></Step>
            ))}
          </div>
        </div>
      </>)}
    </>
  )
}

export default COMPLETE_RECIPE