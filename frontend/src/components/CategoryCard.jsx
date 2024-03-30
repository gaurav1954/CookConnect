import React from 'react'
import photo from '../assets/photo3.jpg'
import './CategoryCard.css'
import { useNavigate } from 'react-router-dom';
export default function CategoryCard({ heading }) {

    const navigate = useNavigate();
    const fun = function (x) {
        navigate('/random', { state: { abc: x } })
    }

    return (
        <div
            className="category-card"
            style={{ backgroundImage: `url(${photo})` }}
            onClick={() => fun(heading)}>
            <h3
                className='category-heading'>
                {heading}
            </h3>
        </div>
    )
}
