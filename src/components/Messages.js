import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

function Messages() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    fetchOtherUser();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherUser = async () => {
    try {
      // You might need to create an endpoint to get user details
      const response = await axios.get(`/users/${userId}`);
      setOtherUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post("/messages", {
        receiverId: userId,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div className="chat-container">
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUserCircle size={30} />
            </div>
            <div>
              <h3>{otherUser?.name || "User"}</h3>
              <p style={{ fontSize: "14px", opacity: "0.9" }}>
                {otherUser?.role === "recruiter"
                  ? otherUser.company
                  : "Student"}
              </p>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "var(--gray-500)",
                marginTop: "50px",
              }}
            >
              No messages yet. Start a conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.senderId === userId ? "received" : "sent"}`}
              >
                <div className="message-bubble">
                  {message.content}
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "12px 25px" }}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
