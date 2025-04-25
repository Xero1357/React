import React from 'react';
import MessageBoard from '../components/MessageBoard';

const Dashboard = () => {
  const username = localStorage.getItem('username') || 'John';

  return (
    <div className="grid-item item3">
      <h2>Welcome {username}</h2>
      <MessageBoard />
    </div>
  );
};

export default Dashboard;
