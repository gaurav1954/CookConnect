import React, { useEffect, useState } from 'react';
import './COMPLETE_RECIPE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faThumbsUp, faClock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Step from '../components/Step';
import Like from '../components/Like';
import SaveButton from '../components/SaveButton';

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

  const { image, likes, author, savedBy, title, description, cuisine, steps, ingredients, cookingTime, difficultyLevel } = recipeData;
  return (
    <>{isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="COMPLETE_RECIPE">
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
              <div className="cuisine-type orange">
                #{cuisine}
              </div>
              <div className="likeandsaveribbon">
                <Like recipeId={recipeId} likes={likes}></Like>
                <SaveButton savedBy={savedBy} recipeId={recipeId}></SaveButton>
              </div>
              <p className='customization note'>{description}</p>
              {/* 
              <div className="Ingre">
                <h4 className='customization'>Ingredients</h4>
                <ul className="ingre">
                  {ingredients.map(i => <li className='customization'>{i}</li>)}
                </ul>
              </div> */}

              <div className="timeandlevel customization">
                <div><FontAwesomeIcon icon={faClock} spinPulse style={{ color: "#74C0FC", }} /> Cooking time: <span className="orange">{cookingTime}</span> minutes</div>
                <div>Difficulty level:
                  <span className="orange"> {difficultyLevel}
                  </span>
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
      </div>)}
    </>
  )
}

export default COMPLETE_RECIPE