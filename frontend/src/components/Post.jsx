import React from 'react'
import './Post.css'
import Like from './Like';
import SaveButton from './SaveButton';
import { useNavigate } from 'react-router-dom';
export default function Post({ author = "anonymous", recipeId = '65f5deae39d4d5ebd8dd729c', savedBy, likes, description = "xys", image, title }) {
    const navigate = useNavigate();
    const goToDetailedPage = function () {
        navigate('/post', { state: { recipeId: recipeId } })
    }
    return (
        <div className='centered-container'>
            <div className='post-body'>
                <div className='post-header'>
                    <div className="title">{title}</div>
                    <div className="username">-{author.username}</div>
                </div>
                <img src={image} className='post-image' onClick={goToDetailedPage} />
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