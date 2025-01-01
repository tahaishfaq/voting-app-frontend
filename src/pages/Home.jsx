import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = ({ employeeName, onLogout, onOfflineSubmission, onReportIssue }) => (
  <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Employee Dashboard</h1>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Welcome, {employeeName}</span>
      <button
        onClick={onOfflineSubmission}
        className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md"
      >
        Offline Submission
      </button>
      <button
        onClick={onReportIssue}
        className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md"
      >
        Report Issue
      </button>
      <button
        onClick={onLogout}
        className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  </nav>
);

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/idea/getall?page=${page}&limit=5`);
      const data = await response.json();

      if (data.status) {
        setIdeas(data.ideas);
        setTotalPages(data.totalPages);
      } else {
        toast.error("Failed to fetch ideas!");
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
      toast.error("Error fetching ideas!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [page]);

  const handleVote = async (ideaId) => {
    const userId = currentUser?.id;
    if (!userId) {
      toast.error("Please log in to vote.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/idea/vote/${ideaId}/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.status) {
        toast.success("You voted successfully!");
        setIdeas(ideas.map((idea) =>
          idea._id === ideaId ? { ...idea, votesCount: idea.votesCount + 1 } : idea
        ));
      } else {
        toast.error(data.msg || "Failed to vote");
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Error voting!");
    }
  };

  const handleEditIdea = (idea) => {
    setEditingIdea(idea);
  };

  const handleSaveIdea = (updatedIdea) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) => (idea._id === updatedIdea._id ? updatedIdea : idea))
    );
    setEditingIdea(null);
    toast.success("Idea updated successfully!");
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    // Implement logout functionality here
  };

  const handleOfflineSubmission = () => {
    toast.info("Offline Submission triggered.");
    // Implement offline submission logic here
  };

  const handleReportIssue = () => {
    toast.error("Report issue clicked.");
    // Implement report issue logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        employeeName={currentUser?.name || "Employee"}
        onLogout={handleLogout}
        onOfflineSubmission={handleOfflineSubmission}
        onReportIssue={handleReportIssue}
      />

      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ideas Dashboard</h1>

          {/* Display Ideas */}
          <div>
            {loading ? (
              <p className="text-center text-gray-500">Loading ideas...</p>
            ) : ideas.length > 0 ? (
              ideas.map((idea) => (
                <div
                  key={idea._id}
                  className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{idea.title}</h3>
                  <p className="text-gray-600 mb-3">{idea.idea}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Region: {idea.region}</p>
                      <p className="text-sm text-gray-500">
                        {idea.isCollaborative ? "Collaborative Idea" : "Non-Collaborative Idea"}
                      </p>
                    </div>

                    {idea.isCollaborative && (
                      <button
                        onClick={() => handleEditIdea(idea)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit className="text-lg" /> Edit
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleVote(idea._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <FaRegHeart className="text-lg" />
                    </button>
                    <span className="text-gray-600 font-medium">{idea.votesCount} Votes</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No ideas found</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
            >
              Previous
            </button>
            <span className="text-gray-700">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {editingIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Idea</h3>
            <input
              type="text"
              value={editingIdea.title}
              onChange={(e) => setEditingIdea({ ...editingIdea, title: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit title"
            />
            <textarea
              value={editingIdea.idea}
              onChange={(e) => setEditingIdea({ ...editingIdea, idea: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Edit description"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingIdea(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveIdea(editingIdea)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
