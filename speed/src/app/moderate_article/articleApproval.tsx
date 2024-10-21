import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Articles.css";

// Define the structure of an article
interface Article {
  _id: string;
  title: string;
  abstract: string;
  status: "pending" | "approved" | "rejected"; // Use a union type for status
}

const Articles = () => {
  // Type the state to be an array of Article objects
  const [articles, setArticles] = useState<Article[]>([]);
  const [action, setAction] = useState<{ [key: string]: string }>({}); // Track selected action for each article

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch articles from the backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>("/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Handle selection change in dropdown
  const handleActionChange = (id: string, value: string) => {
    setAction((prevState) => ({ ...prevState, [id]: value }));
  };

  // Handle form submission to approve or reject
  const handleActionSubmit = async (id: string) => {
    const selectedAction = action[id];
    if (selectedAction === "approve") {
      await approveArticle(id);
    } else if (selectedAction === "reject") {
      await rejectArticle(id);
    }
  };

  // Function to approve an article (id is a string)
  const approveArticle = async (id: string) => {
    try {
      await axios.patch(`/api/articles/${id}/approve`);
      fetchArticles(); // Refresh articles after approval
    } catch (error) {
      console.error("Error approving article:", error);
    }
  };

  // Function to reject an article (id is a string)
  const rejectArticle = async (id: string) => {
    try {
      await axios.patch(`/api/articles/${id}/reject`);
      fetchArticles(); // Refresh articles after rejection
    } catch (error) {
      console.error("Error rejecting article:", error);
    }
  };

  return (
    <div className="articles-container">
      <h1>Moderate Articles</h1>
      {/* Conditionally render message if no articles are found */}
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="article-list">
          {/* Iterate through the list of articles */}
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              <div className="article-details">
                <h3>{article.title}</h3>
                <p>{article.abstract}</p>
                <p>Status: <strong>{article.status}</strong></p>
              </div>
              {/* Show dropdown and submit button only for pending articles */}
              {article.status === "pending" && (
                <div className="article-actions">
                  <select
                    value={action[article._id] || ""}
                    onChange={(e) => handleActionChange(article._id, e.target.value)}
                    className="action-select"
                  >
                    <option value="">Select an action</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                  <button
                    onClick={() => handleActionSubmit(article._id)}
                    disabled={!action[article._id]} // Disable button if no action is selected
                    className="submit-btn"
                  >
                    Submit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Articles;