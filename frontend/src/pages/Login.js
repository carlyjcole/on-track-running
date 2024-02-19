import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/LoginValidation'; 
import axios from 'axios'; 
import { motion } from 'framer-motion'; 

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); 

    const [values, setValues] = useState({
      username: '',
      password: ''
  });
  const [errors, setErrors] = useState(); 
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const handleCreate = () => {
    navigate('/signup');
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', values);
      console.log(response.data.message);
      const userId = response.data.userId;
      console.log('login: userId', userId); 
      onLogin(userId); 
      // navigate('/fetch', { state: { userId: userId } });
    } catch (error) {
      console.error('Login failed:', error);
      setErrors('invalid username or password');
    }
  }; 

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleLogin}>
          <div className='mb-3'>
            <label htmlFor='username' style={{ fontFamily: 'wotfard', fontSize: '20px', padding: '10px' }}>
              username
            </label>
            <input type='username' placeholder='enter username' name='username'
            style={{ 
                fontFamily: 'wotfard', 
                color: 'black', 
                border: '1px solid #ced4da', 
                borderRadius: '5px', 
                padding: '5px' }}
            onChange={handleInput} />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' style={{ 
                fontFamily: 'wotfard', 
                fontSize: '20px', 
                padding: '10px' }}>
              password
            </label>
            <input type='password' placeholder='enter password' name='password'
            style={{ 
                fontFamily: 'wotfard', 
                color: 'black', 
                border: '1px solid #ced4da', 
                borderRadius: '5px', 
                padding: '5px' }} 
            onChange={handleInput} />
            {errors && <p style={{ color: 'red', fontSize: '12px', padding: '10px' }}>{errors}</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
            >
            login
          </motion.button>
          <p style={{ padding: '10px' }}>don't already have an account?</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
            onClick={handleCreate}>
            create account
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Login;
