import React from 'react'
import './COMPLETE_RECIPE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faShareNodes, faPrint, faEllipsis, faBookmark, faCamera, faCircleMinus, faCirclePlus, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function COMPLETE_RECIPE() {
  return (
    <div>
      <div className='complete-recipe-container'>
        <div className='complete-recipe-row'>
          <div className='complete-recipe-col'>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='recipe-img' />
          </div>

          <div className='complete-recipe-col details'>
            <span style={{ display: 'flex' }}>
              <FontAwesomeIcon icon={faPencil} className='icon' />
              <FontAwesomeIcon icon={faShareNodes} className='icon' />
              <FontAwesomeIcon icon={faPrint} className='icon' />
              <FontAwesomeIcon icon={faEllipsis} className='icon' />
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '400px' }} className='save'>
                <FontAwesomeIcon icon={faBookmark} className='icon' />
                <span className='save-text'><h3><b>Save</b></h3></span>
              </div>
            </span>
            <div className="profile-pic">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Icon" className="profile-icon" />
              <span className="username"><h3>xyz_username</h3></span>
            </div>

            <h1 className="dish-name">Dish's Name</h1>
            <p className='nutritarian-list'><b>in Nutritarian</b></p>
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: '10px' }}>
              <FontAwesomeIcon icon={faBookmark} className='icon' />
              <span style={{ marginLeft: '5px' }}>
                <b>59</b>
                <b className='note'>|</b>
                <b className='note'>Leave a note</b>
              </span>
            </div>
            <p className='customization note'>These flavorful burrito bowls will become a family favorite! Customize them with your choice of topping ingredients.</p>
            <hr style={{ border: 'none', borderBottom: '1px solid #eee', width: '90%', margin: '0 auto' }} />
            <br />
            <div className="profile-pic" style={{ display: 'flex' }}>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Icon" className="profile-icon" />
              <p className="feedback">Add your notes! How was it?"</p>
              <FontAwesomeIcon icon={faCamera} className='icon' />
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
      <br />
      <hr style={{ border: 'none', borderBottom: '1px solid #eee', width: '30%', margin: '0 auto' }} className='container' />
      <br />

      <div className='complete-recipe-container'>
        <h1>Rating Details</h1>
      </div>
      <div className='complete-recipe-container'>
        <FontAwesomeIcon icon={faThumbsUp} className='rating-icon icon' />
        <p style={{ marginBottom: '5px', marginTop: '5px', paddingLeft: '15px', color: 'grey', fontSize: '25px' }}>7 liked</p>
      </div>
      <hr style={{ border: 'none', borderBottom: '1px solid #eee', width: '30%', margin: '0 auto' }} className='container' />
    </div>
  )
}

export default COMPLETE_RECIPE