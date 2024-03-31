import React from 'react';


const UserProfile = ({ match }) => {
    // Assume user details are fetched from somewhere
    const user = {
        id: '123',
        name: 'John De',
        email: 'john@example.com',
        age: '20',
        bio: 'coi idjwo icpqj',
        location: 'nyc , usa',
        socialMedia: 'john_deon'
    };

    return (
        <div className="user-profile-container">
            <div className="user-details">
                <h2>User Profile</h2>
                <p className="user-id">User ID: {user.id}</p>
                <p className="user-name">Name: {user.name}</p>
                <p className="user-email">Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Bio: {user.bio}</p>
                <p>Location: {user.location}</p>
                <p className="user-social-media">Social Media: {user.socialMedia}</p>
            </div>
            <div className="upload-profile-pic">
                {/* Upload profile picture functionality */}
                <input type="file" accept="image/*" />
                <button>Upload</button>
            </div>
        </div>
    );
};

export default UserProfile;
