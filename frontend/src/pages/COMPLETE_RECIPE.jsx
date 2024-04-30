import React, { useEffect, useState } from 'react';
import './COMPLETE_RECIPE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faArrowRight, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Step from '../components/Step';
import Like from '../components/Like';
import SaveButton from '../components/SaveButton';
import Review from '../components/Reivew';


function COMPLETE_RECIPE() {
  const location = useLocation();
  const recipeId = location.state.recipeId;

  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState(''); // State to manage the review input
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // State to trigger useEffect on review submission

  const handleReviewSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!reviewText.trim()) {
      setReviewText('');
      return; // Exit the function early if the input field is empty
    }

    try {
      const response = await fetch(`http://localhost:8000/recipes/${recipeId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: reviewText }), // Send the review data in the request body
        credentials: 'include' // Include credentials
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        setReviewSubmitted(true); // Set reviewSubmitted to true to trigger useEffect
        setReviewText(''); // Clear the review input
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

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
  }, [reviewSubmitted]);

  const { image, likes, author, savedBy, title, description, cuisine, steps, ingredients, cookingTime, difficultyLevel, reviews } = recipeData;
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

              <div className="timeandlevel customization">
                <div><FontAwesomeIcon icon={faClock} spinPulse style={{ color: "#74C0FC", }} /> Cooking time: <span className="orange">{cookingTime}</span> minutes</div>
                <div>Difficulty level:
                  <span className="orange"> {difficultyLevel}
                  </span>
                </div>
              </div>

              <form action="" className='takereview'>
                <FontAwesomeIcon icon={faUser} size='xl' />
                <div className="in">
                  <input
                    type="text"
                    id='review'
                    value={reviewText}
                    placeholder='What do you think about this dish?'
                    onChange={(e) => setReviewText(e.target.value)} // Update the reviewText state when the input value changes
                  />
                  <FontAwesomeIcon icon={faArrowRight} onClick={handleReviewSubmit} />
                </div>
              </form>

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

        <section className="complete-recipe-container last-complete-recipe">

          <div className="Ingre">
            <h2 className='orange'>Ingredients</h2>
            <ul className="ingre">
              {ingredients.map(i => <li className='customization ingredients'>{i}</li>)}
            </ul>
          </div>

          <div className="review-box">
            {reviews.length === 0 && <h2>No Reviews yet!!!</h2>}
            {reviews.length !== 0 && (
              <>
                <h2 className='review-heading orange'>
                  <FontAwesomeIcon icon={faList} size='2xs' className='customization' />
                  <span>Reviews</span>
                </h2>
                {reviews.map((review) => (
                  <Review key={review._id} review={review}></Review>
                ))}
              </>
            )}
          </div>


        </section>
      </div>)}
    </>
  )
}

export default COMPLETE_RECIPE