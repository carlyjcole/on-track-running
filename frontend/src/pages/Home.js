// App.js
import React, { useState } from 'react';
import Login from './Login';
import FetchDataFromStrava from '../components/FetchDataFromStrava';

const App = () => {
  const [userId, setUserId] = useState('');

  const handleLogin = (userId) => {
    setUserId(userId);
  };

  return (
    <div>
      {!userId && <Login onLogin={handleLogin} />}
      {userId && <FetchDataFromStrava userId={userId} />}
    </div>
  );
};

export default App;
