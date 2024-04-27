import React from 'react'
export default function Reivew({ review }) {
    return (
        <div>
            <p className="heading">{review.author.username}</p>
            <section className="reivew-body">{review.data}</section>
        </div>
    )
}
