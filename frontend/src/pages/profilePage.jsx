import React from 'react';
import './ProfilePage.css';
export default function ProfilePage({ match }) {
    const user = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
    };
    return (
        <div>
            <h2>User Profile</h2>
            <p>User ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Display other user details if available */}
        </div>
    );
};

