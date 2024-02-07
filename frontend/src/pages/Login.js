import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/LoginValidation'; 
import validation from '../components/LoginValidation'; 
import axios from 'axios'; 
import { motion } from 'framer-motion'; 

const Login = () => {
  const navigate = useNavigate(); 
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({}); 
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleCreate = () => {
      navigate('/signup');
    }

    const handleLogin = () => {
      navigate('/fetch'); 
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action='/login'>
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
            {errors.password && <span className='text-danger'>{errors.email}</span>}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
            onClick={handleLogin}>
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
