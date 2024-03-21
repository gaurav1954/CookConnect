import React from 'react';

const UserProfile = ({ match }) => {
  // Assume user details are fetched from somewhere
  const user = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    // Add more user details as needed
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

export default UserProfile;
