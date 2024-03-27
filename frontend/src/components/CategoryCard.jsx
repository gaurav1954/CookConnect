import React from 'react'
import photo from '../assets/photo3.jpg'
import './CategoryCard.css'
export default function CategoryCard({ heading }) {
    return (
        <div className="category-card" style={{ backgroundImage: `url(${photo})` }}>
            <h3 className='category-heading'>{heading}</h3>
        </div>
    )
}
