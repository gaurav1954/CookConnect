import React from 'react'
import './CategoryCard.css'
import { useNavigate } from 'react-router-dom';
export default function CategoryCard({ heading, image }) {
    const navigate = useNavigate();
    const fun = function (x) {
        navigate('/feed', { state: { cuisine: x } })
    }
    return (
        <div
            className="category-card"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => fun(heading)}>
            <h3
                className='category-heading'>
                {heading}
            </h3>
        </div>
    )
}
