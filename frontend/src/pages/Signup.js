import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/LoginValidation'; 
import validation from '../components/LoginValidation'; 
import axios from 'axios'; 

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

  const handleSubmit = async (event) => {
      event.preventDefault(); 
      setErrors(validation(values)); 

      try {
        const response = await axios.post('http://localhost:4000/register', {
          username: values.username,
          password: values.password
        });
  
        console.log('User signed up successfully. UserId:', response.data.userId);
  
        navigate('/login');
      } catch (error) {
        console.error('Error signing up user:', error.message);
      }
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action="" onSubmit={handleSubmit}>
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
          <button type='submit' className='btn btn-success' 
          style={{ 
            fontFamily: 'wotfard', 
            fontSize: '20px', 
            backgroundColor: 'rgb(217, 229, 238)', 
            padding: '5px' }}>create account</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
