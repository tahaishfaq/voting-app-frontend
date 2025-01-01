import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from '../redux/userReducer';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    dispatch(signOutStart());

    try {
      const res = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signOutFailure(data.message));
        setError(data.message || 'Registration failed. Please try again.');
      } else {
        dispatch(signOutSuccess(data));
        toast.success('User registered successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again later.');
      dispatch(signOutFailure(err.message));
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-12 mx-auto'>
      <h1 className='font-bold text-3xl'>Register</h1>
      <form className='mt-12 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          placeholder="Username"
          className="border-2 border-black rounded-lg w-80 md:w-full p-2"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email..."
          className="border-2 border-black mt-4 rounded-lg w-80 md:w-full p-2"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border-2 border-black rounded-lg w-80 md:w-full p-2 mt-6"
          onChange={handleChange}
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border-2 border-black rounded-lg w-80 md:w-full p-2 mt-6"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-80 bg-black text-white rounded-lg mt-4 p-3 font-bold"
        >
          Register
        </button>
      </form>
      <div className="flex justify-end items-center ml-28 mt-1 gap-1">
        <p className="font-thin">Already have an account?</p>
        <span className="font-semibold text-black underline">
          <Link to={'/login'}>Login</Link>
        </span>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Signup;
