import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

function Messages() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
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
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          height: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px",
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
            color: "white",
          }}
        >
          <h3>Chat</h3>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.senderId === userId ? "flex-start" : "flex-end",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 18px",
                  borderRadius: "18px",
                  background:
                    msg.senderId === userId
                      ? "var(--gray-200)"
                      : "var(--primary)",
                  color: msg.senderId === userId ? "var(--gray-900)" : "white",
                  borderBottomLeftRadius:
                    msg.senderId === userId ? "4px" : "18px",
                  borderBottomRightRadius:
                    msg.senderId === userId ? "18px" : "4px",
                }}
              >
                {msg.content}
                <div
                  style={{
                    fontSize: "11px",
                    marginTop: "4px",
                    opacity: 0.7,
                    textAlign: "right",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          style={{
            padding: "20px",
            borderTop: "1px solid var(--gray-200)",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px 18px",
              border: "2px solid var(--gray-200)",
              borderRadius: "50px",
              fontSize: "15px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
