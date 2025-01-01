import React, { useState } from "react";
import toast from "react-hot-toast";

const InnovationManagerDashboard = () => {
  const [ideas, setIdeas] = useState([
    {
      _id: "1",
      title: "Improve Product Efficiency",
      region: "North America",
      status: "pending",
      clarificationRequest: "",
      feedback: "",
      assignedTeam: [],
    },
    {
      _id: "2",
      title: "New Marketing Strategy",
      region: "Europe",
      status: "in_progress",
      clarificationRequest: "",
      feedback: "",
      assignedTeam: ["Team A"],
    },
  ]);

  const [selectedIdea, setSelectedIdea] = useState(null);
  const [activeTab, setActiveTab] = useState("assignTeam");
  const [teamName, setTeamName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [clarification, setClarification] = useState("");

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    // Add logic for logout (e.g., clear token, redirect to login page)
  };

  const handleAssignTeam = (ideaId) => {
    if (!teamName) {
      toast.error("Please enter a team name.");
      return;
    }
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea._id === ideaId
          ? { ...idea, assignedTeam: [...idea.assignedTeam, teamName], status: "in_progress" }
          : idea
      )
    );
    toast.success("Team assigned successfully.");
    setTeamName("");
    setSelectedIdea(null);
  };

  const handleProvideFeedback = (ideaId) => {
    if (!feedback) {
      toast.error("Please enter your feedback.");
      return;
    }
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea._id === ideaId ? { ...idea, feedback, status: "completed" } : idea
      )
    );
    toast.success("Feedback provided successfully.");
    setFeedback("");
    setSelectedIdea(null);
  };

  const handleRequestClarification = (ideaId) => {
    if (!clarification) {
      toast.error("Please enter clarification details.");
      return;
    }
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea._id === ideaId
          ? { ...idea, clarificationRequest: clarification, status: "clarification_needed" }
          : idea
      )
    );
    toast.success("Clarification requested successfully.");
    setClarification("");
    setSelectedIdea(null);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Innovation Manager Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Ideas</h2>
        {ideas.length === 0 ? (
          <p>No ideas to manage.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Region</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea._id}>
                  <td className="border border-gray-300 p-2">{idea.title}</td>
                  <td className="border border-gray-300 p-2">{idea.region}</td>
                  <td className="border border-gray-300 p-2">{idea.status}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => setSelectedIdea(idea)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for Managing Selected Idea */}
        {selectedIdea && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-bold mb-4">Manage: {selectedIdea.title}</h3>

              {/* Tabs for Manage Options */}
              <div className="flex gap-4 mb-4 border-b">
                <button
                  onClick={() => setActiveTab("assignTeam")}
                  className={`px-4 py-2 ${
                    activeTab === "assignTeam" ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Assign Team
                </button>
                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`px-4 py-2 ${
                    activeTab === "feedback" ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Provide Feedback
                </button>
                <button
                  onClick={() => setActiveTab("clarification")}
                  className={`px-4 py-2 ${
                    activeTab === "clarification" ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Request Clarification
                </button>
              </div>

              {/* Assign Team Tab */}
              {activeTab === "assignTeam" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Team
                  </label>
                  <input
                    type="text"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                  <button
                    onClick={() => handleAssignTeam(selectedIdea._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Assign Team
                  </button>
                </div>
              )}

              {/* Provide Feedback Tab */}
              {activeTab === "feedback" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provide Feedback
                  </label>
                  <textarea
                    placeholder="Enter feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                    rows="3"
                  ></textarea>
                  <button
                    onClick={() => handleProvideFeedback(selectedIdea._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}

              {/* Request Clarification Tab */}
              {activeTab === "clarification" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Clarification
                  </label>
                  <textarea
                    placeholder="Enter clarification details"
                    value={clarification}
                    onChange={(e) => setClarification(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                    rows="3"
                  ></textarea>
                  <button
                    onClick={() => handleRequestClarification(selectedIdea._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Request Clarification
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedIdea(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnovationManagerDashboard;
