import React from 'react'
export default function Step({ stepkey, data }) {
    return (
        <div className='step'>
            <h1>Step {stepkey}</h1>
            <p className="recipe-steps">{data}</p>
        </div>
    )
}
