import React from 'react'
import { useLocation } from 'react-router-dom'
export default function Random() {
    const location = useLocation();
    return (
        <div>
            {location.state.abc}
        </div>
    )
}
