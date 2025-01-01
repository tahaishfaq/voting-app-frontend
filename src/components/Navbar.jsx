import React, { useState, useEffect } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import Modal from '../pages/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // If there's a token, set logged in to true
  }, []);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  // Define handleNewIdea function here
  const handleNewIdea = (newIdea) => {
    // Handle adding the new idea, for example, update the state or fetch updated ideas
    console.log('New idea created:', newIdea);
    // If you want to add it to the local state of Navbar, you can update it here
    // Example: setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
  };

  return (
    <div>
      <div className="flex justify-around h-16 items-center">
        <h1 className="text-2xl font-bold">Ideas</h1>
       
        {currentUser ? (
             <button
             className="flex items-center gap-2 border-2 p-1 px-5 rounded-md"
             onClick={handleCreateClick}
           >
             <CiSquarePlus />
             Create Idea
           </button>
        ) : (
        <Link to={'/login'}>  <span className="text-sm text-blue-500 cursor-pointer">Login</span></Link>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onCreate={handleNewIdea} />
    </div>
  );
};

export default Navbar;
