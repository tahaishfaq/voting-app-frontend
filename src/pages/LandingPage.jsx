import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "manager") {
      navigate("/manager-login");
    } else if (role === "employee") {
      navigate("/login"); // Redirect to employee login or dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Idea Portal</h1>
      <p className="text-lg mb-6">Please select your role to continue:</p>
      <div className="flex gap-6">
        <button
          onClick={() => handleSelection("manager")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          I am a Manager
        </button>
        <button
          onClick={() => handleSelection("employee")}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          I am an Employee
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
