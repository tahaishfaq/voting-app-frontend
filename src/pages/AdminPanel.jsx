import React, { useState } from "react";

const AdminPanel = () => {
  const [ideas, setIdeas] = useState([
    {
      _id: "1",
      title: "Idea 1",
      idea: "This is the first idea.",
      region: "North America",
      isCollaborative: true,
      userId: { name: "John Doe" },
    },
    {
      _id: "001",
      title: "MCWD",
      idea: "I am submitting my file.",
      region: "Africa",
      isCollaborative: true,
      userId: { name: "hamna" },
    },
    {
      _id: "2",
      title: "Idea 2",
      idea: "This is the second idea.",
      region: "Europe",
      isCollaborative: false,
      userId: { name: "Jane Smith" },
    },
  ]);

  const handleApprove = (ideaId) => {
    alert(`Idea ${ideaId} approved`);
    setIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
  };

  const handleReject = (ideaId) => {
    alert(`Idea ${ideaId} rejected`);
    setIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Admin Panel</h2>
      {ideas.length === 0 ? (
        <p>No pending ideas to review.</p>
      ) : (
        ideas.map((idea) => (
          <div
            key={idea._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>{idea.title}</h3>
            <p>{idea.idea}</p>
            <p>
              <strong>Submitted by:</strong> {idea.userId.name}
            </p>
            <p>
              <strong>Region:</strong> {idea.region}
            </p>
            <p>
              <strong>Collaborative:</strong> {idea.isCollaborative ? "Yes" : "No"}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => handleApprove(idea._id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(idea._id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
