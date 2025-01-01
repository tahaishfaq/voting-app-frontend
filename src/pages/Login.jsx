import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/userReducer';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on every submit attempt

    if (!formData.email || !formData.password) {
      setError('Fill all Fields');
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong!');
        dispatch(signInFailure(data.message || 'Something went wrong!'));
      } else {
        dispatch(signInSuccess(data));
        localStorage.setItem('token', data.token); // Save token in localStorage
        toast.success('User logged in successfully');
        navigate('/home'); // Redirect to homepage after successful login
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
      dispatch(signInFailure('An error occurred. Please try again.'));
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-12 mx-auto'>
        <h1 className='font-bold text-3xl'>Login</h1>
        <form className='mt-12 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            placeholder='email'
            className='border-2 border-black rounded-lg w-80 md:w-full p-2'
            onChange={handleChange}
          />
          <input
            type='password'
            id='password'
           
            className='border-2 border-black rounded-lg w-80 md:w-full p-2 mt-6'
            onChange={handleChange}
          />
          <button
            className='w-80 bg-black text-white rounded-lg mt-4 p-3 font-bold'
            type='submit'
          >
            Login
          </button>
        </form>

        <div className='flex justify-end items-center ml-40 mt-1 gap-1'>
          <p className='font-thin'>Not a user?</p>
          <span className='font-semibold text-black underline'>
            <Link to={'/signup'}>Register</Link>
          </span>
        </div>

        {error && (
          <p className='text-red-600'>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
