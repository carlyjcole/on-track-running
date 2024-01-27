// Auth.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = ({ setAccessToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const secret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851'; 
  const id = 120096;

  useEffect(() => {
    const extractCode = () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        exchangeCodeForToken(code);
      } else {
        console.log('error in if code statement');
        navigate('/error');
      }
    };

    const exchangeCodeForToken = async (code) => {
      try {
        const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: id,
            client_secret: secret,
            code,
            grant_type: 'authorization_code',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const data = await response.json();
        const accessToken = data.access_token;

        setAccessToken(accessToken);

        navigate('/');
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        navigate('/error');
      }
    };

    extractCode();
  }, [location.search, navigate, setAccessToken]);

  return <div>Authorizing...</div>;
};

export default Auth;
