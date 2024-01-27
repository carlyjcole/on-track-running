// Auth.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = async () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateWithStrava = async () => {
      try {
        const response = await fetch('http://localhost:3001/strava/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with Strava');
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        navigate('/');
      } catch (error) {
        console.error('Error authenticating with Strava:', error);
        navigate('/error');
      }
    };

    authenticateWithStrava();
  }, [location.search, navigate]);

  return <div>Authorizing...</div>;
};

export default Auth;
