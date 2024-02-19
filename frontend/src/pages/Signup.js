import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/LoginValidation'; 
import validation from '../components/LoginValidation'; 
import axios from 'axios'; 
import { motion } from 'framer-motion'; 

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); 

  const [values, setValues] = useState({
      username: '',
      password: ''
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const handleSignup = async (event) => {
    event.preventDefault(); 
    try {
      console.log('signing up'); 
      const response = await axios.post('http://localhost:4000/auth/signup', values);
      console.log('Signup successful:', response.data);
      navigate('/login');
  } catch (error) {
      console.error('Signup failed:', error);
  }
}; 

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSignup}>
          <div className='mb-3'>
            <label htmlFor='username' style={{ fontFamily: 'wotfard', fontSize: '20px', padding: '10px' }}>
              username
            </label>
            <input type='username' placeholder='create username' name='username'
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
            <input type='password' placeholder='create password' name='password'
            style={{ 
                fontFamily: 'wotfard', 
                color: 'black', 
                border: '1px solid #ced4da', 
                borderRadius: '5px', 
                padding: '5px' }} 
            onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.email}</span>}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
            >
            create account
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
