import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Reivew({ review }) {
    return (
        <div className='individual-review'>
            <p className="review-username">
                <FontAwesomeIcon icon={faUser} size='2xs' className='customization' />
                <div className='customization' >{review.author.username}</div>
            </p>
            <section className="reivew-body">{review.data}</section>
        </div>
    )
}
