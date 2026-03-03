import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaComment, FaShare, FaBuilding } from "react-icons/fa";

function Articles({ user }) {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/articles", formData);
      setFormData({ title: "", content: "" });
      setShowForm(false);
      fetchArticles();
    } catch (error) {
      console.error("Failed to post article:", error);
    }
  };

  if (loading) {
    return <div className="spinner" style={{ margin: "50px auto" }}></div>;
  }

  return (
    <div className="fade-in" style={{ padding: "40px 0" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "white" }}>Company Articles</h1>
          {user?.role === "recruiter" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "Write Article"}
            </button>
          )}
        </div>

        {showForm && user?.role === "recruiter" && (
          <div className="glass-card" style={{ marginBottom: "30px" }}>
            <h2 style={{ marginBottom: "20px" }}>Write an Article</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter article title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  rows="6"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your article content..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Publish Article
              </button>
            </form>
          </div>
        )}

        <div className="article-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-header">
                <div className="company-logo-small">
                  <FaBuilding />
                </div>
                <div>
                  <h3 style={{ marginBottom: "5px" }}>{article.title}</h3>
                  <p className="article-meta">
                    {article.companyName} •{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="article-content">{article.content}</div>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  paddingTop: "15px",
                  borderTop: "1px solid var(--gray-200)",
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gray-600)",
                    cursor: "pointer",
                  }}
                >
                  <FaHeart /> {article.likes || 0}
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gray-600)",
                    cursor: "pointer",
                  }}
                >
                  <FaComment /> {article.comments?.length || 0}
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gray-600)",
                    cursor: "pointer",
                  }}
                >
                  <FaShare />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
