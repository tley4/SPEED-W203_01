'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Articles.css';
import ArticleApproval from './articleApproval';  // Import the ArticleApproval component

// Define the structure of an article
interface Article {
  _id: string;
  title: string;
  abstract: string;
  doi?: string;
  keywords?: string;
  articleType: string;
  publicationDate: string;
  author: string;
  createdAt: Date;
  moderationStatus: string;  // Use moderationStatus instead of status
}

const ArticlesPage = () => {
  // Manage the articles, loading state, and error state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch only pending articles from backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>('http://localhost:5000/articles/pending'); // Use the pending endpoint
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching pending articles:', error);
      setError('Failed to fetch articles');
    } finally {
      setLoading(false); // Stop loading after fetching or on error
    }
  };

  // Display loading message while fetching
  if (loading) return <p>Loading articles...</p>;
  
  // Display error message if fetching fails
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articles-container">
      <h1>Pending Articles for Moderation</h1>
      {/* Conditionally render list of articles or message if none found */}
      {articles.length > 0 ? (
        <ul className="article-list">
          {/* Map through the list of articles */}
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              {/* Article content area */}
              <div className="article-content">
                <h3><strong>Article Title:</strong> {article.title}</h3>
                <p><strong>Abstract:</strong> {article.abstract}</p>
                <p><strong>DOI:</strong> {article.doi || 'N/A'}</p>
                <p><strong>SE Practise:</strong> {article.keywords || 'N/A'}</p>
                <p><strong>Article Type:</strong> {article.articleType}</p>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Published on:</strong> {new Date(article.publicationDate).toLocaleDateString()}</p>
                <p><strong>Created at:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Article actions area */}
              <div className="article-actions-container">
                {/* Display moderation status */}
                <p className="article-status">
                  <strong>Status:</strong>
                </p>

                {/* Save or approve buttons */}
                {article.moderationStatus === 'pending' ? (
                  <ArticleApproval articleId={article._id} currentStatus={article.moderationStatus} onUpdate={fetchArticles} />
                ) : (
                  <button className="submit-btn">Save</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending articles found.</p>
      )}
    </div>
  );
};

export default ArticlesPage;
