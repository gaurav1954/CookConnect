import React from 'react'
import './Post.css'
import Like from './Like';
import SaveButton from './SaveButton';
export default function Post({ author = "anonymous", recipeId = '65f5deae39d4d5ebd8dd729c', savedBy, likes, description = "xys", image }) {
    return (
        <div className='centered-container'>
            <div className='post-body'>
                <div className='post-header'>
                    <div className="profile-pic">
                        <img src={image} alt="Profile Icon" className="profile-icon" />
                        <span className="username">{author.username}</span>

                    </div>
                </div>
                <img src={image} className='post-image' />
                <div className="likeAndSave">
                    <div className="leftContent">
                        <Like likes={likes} recipeId={recipeId}></Like>
                    </div>
                    <div className="right-content">
                        <SaveButton recipeId={recipeId} savedBy={savedBy} />
                    </div>
                </div>
                <div className="post=description">
                    {description}
                </div>
            </div>
        </div>
    )
}