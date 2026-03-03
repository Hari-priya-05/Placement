import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";

function Applicants({ jobId }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`/recruiter/jobs`);
      const job = response.data.find((j) => j.id === jobId);
      setApplicants(job?.applicants || []);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (studentId, status) => {
    try {
      await axios.put(`/applications/${jobId}/${studentId}`, { status });
      setMessage({
        type: "success",
        text: `Application ${status} successfully`,
      });
      fetchApplicants();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update status" });
    }
  };

  const handleMessage = (studentId) => {
    // Navigate to messaging
    window.location.href = `/messages/${studentId}`;
  };

  if (loading) {
    return <div className="spinner" style={{ margin: "50px auto" }}></div>;
  }

  return (
    <div className="fade-in">
      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {applicants.length === 0 ? (
        <div
          className="glass-card"
          style={{ textAlign: "center", padding: "50px" }}
        >
          <h3>No applicants yet</h3>
          <p style={{ color: "var(--gray-500)", marginTop: "10px" }}>
            When students apply, they'll appear here
          </p>
        </div>
      ) : (
        applicants.map((applicant) => (
          <div key={applicant.id} className="applicant-card">
            <div className="applicant-info">
              <div className="applicant-avatar">
                {applicant.avatar ? (
                  <img
                    src={`http://localhost:5001${applicant.avatar}`}
                    alt={applicant.name}
                  />
                ) : (
                  applicant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                )}
              </div>
              <div className="applicant-details">
                <h4>{applicant.name}</h4>
                <p>{applicant.email}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  {applicant.skills?.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: "var(--gray-100)",
                        padding: "4px 10px",
                        borderRadius: "50px",
                        fontSize: "12px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="applicant-actions">
              {applicant.resume && (
                <a
                  href={`http://localhost:5001${applicant.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: "8px 15px" }}
                >
                  <FaDownload /> Resume
                </a>
              )}

              <button
                onClick={() => handleMessage(applicant.id)}
                className="btn btn-primary"
                style={{ padding: "8px 15px" }}
              >
                <FaEnvelope /> Message
              </button>

              <button
                onClick={() => handleStatusChange(applicant.id, "approved")}
                className="btn btn-success"
                style={{ padding: "8px 15px" }}
              >
                <FaCheck /> Approve
              </button>

              <button
                onClick={() => handleStatusChange(applicant.id, "rejected")}
                className="btn btn-danger"
                style={{ padding: "8px 15px" }}
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Applicants;
