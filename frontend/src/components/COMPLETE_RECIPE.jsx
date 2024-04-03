import React, { useEffect, useState } from 'react';
import './COMPLETE_RECIPE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faBookmark, faCircleMinus, faCirclePlus, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

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

  const { image, likes, author, savedBy, title, description, cuisine } = recipeData;
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
              <div className="saveRibbon">
                <div className="likee btnnn">
                  <div>
                    <FontAwesomeIcon icon={faThumbsUp} className='likee-icon' />
                    {likes}
                  </div>
                </div>
                <div className='savee btnnn'>
                  <div>
                    <FontAwesomeIcon icon={faBookmark} className='savee-icon ' />
                    {savedBy}
                  </div>
                </div>
              </div>

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
          <h1>Ingredients</h1>
          <p style={{ marginLeft: '600px', fontSize: '20px' }}>Added by</p>
        </div>

        <div className='complete-recipe-container'>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <FontAwesomeIcon icon={faCircleMinus} className='plus-minus' />
              <span className='servings' style={{ marginLeft: '5px' }}>4 servings</span>
              <FontAwesomeIcon icon={faCirclePlus} className='plus-minus' />
              <button className='unit-conversion'><b>Convert Units</b></button>
              <div className="profile-pic">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Icon" className="profile-icon" />
                <span className="username">
                  <h3>xyz_username</h3>
                </span>
                <span>
                  <b style={{ marginBottom: '5px', paddingLeft: '15px', color: "grey" }}>.</b>
                  <b className='follow'>Follow</b></span>
              </div>
            </div>
            <h1>Instructions</h1>
            <button className='start-cooking'><b>Start cooking</b></button>
          </div>
        </div>

        <div className='complete-recipe-container'>
          <div className='complete-recipe-row'>
            <div className='complete-recipe-col'>
              <h3>Step 1</h3>
              <p className='recipe-steps'>Place quinoa and 2 cups of the vegetable broth in a saucepan, bring to a boil, reduce heat, and simmer for 20 minutes or until quinoa is tender and liquid is absorbed. Remove from heat and fluff with a fork. Stir in 2 tablespoons of the chopped cilantro and 2 tablespoons of the lime juice.</p>
            </div>
            <div className='complete-recipe-col'>
              <h3>Step 2</h3>
              <p className='recipe-steps'>Place quinoa and 2 cups of the vegetable broth in a saucepan, bring to a boil, reduce heat, and simmer for 20 minutes or until quinoa is tender and liquid is absorbed. Remove from heat and fluff with a fork. Stir in 2 tablespoons of the chopped cilantro and 2 tablespoons of the lime juice.</p>
            </div>
            <div className='complete-recipe-col'>
              <h3>Step 3</h3>
              <p className='recipe-steps'>Place quinoa and 2 cups of the vegetable broth in a saucepan, bring to a boil, reduce heat, and simmer for 20 minutes or until quinoa is tender and liquid is absorbed. Remove from heat and fluff with a fork. Stir in 2 tablespoons of the chopped cilantro and 2 tablespoons of the lime juice.</p>
            </div>
          </div>
        </div>

        <div className='complete-recipe-container'>
          <button className='made-it-button'>Made it</button>
          <button className='made-it-button' style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faPrint} className='icon' /> Print</button>
        </div>
        <br />
        <hr style={{ border: 'none', borderBottom: '1px solid #eee', width: '30%', margin: '0 auto' }} className='container' />
        <br />

        <div className='complete-recipe-container'>
          <button className='cooking-time-button'><b>Cooking Time</b></button>
          <p>
            <b style={{ marginBottom: '5px', paddingLeft: '15px' }}>.</b>
            <b className='note'>25 mins</b>
          </p>
          <button className='difficulty-level-button'><b>Difficulty Level</b></button>
          <p>
            <b style={{ marginBottom: '5px', paddingLeft: '15px' }}>.</b>
            <b className='note'>Easy</b>
          </p>
        </div>
      </>)}
    </>
  )
}

export default COMPLETE_RECIPE