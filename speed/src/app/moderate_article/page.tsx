'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Articles.css';
import ArticleApproval from './articleApproval';

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
  moderationStatus: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch articles and user role on component mount
  useEffect(() => {
    // Fetch role from sessionStorage
    const role = sessionStorage.getItem('role');
    setUserRole(role);

    // Fetch articles if user has moderator role
    if (role === 'moderator') {
      fetchArticles();
    } else {
      setLoading(false); // Stop loading if the user does not have permission
    }
  }, []);

  // Fetch only pending articles from backend
  const fetchArticles = async () => {
    try {
      const articlesPendingUrl = `${process.env.NEST_PUBLIC_API_URL}articles/pending`;
      const response = await axios.get<Article[]>(articlesPendingUrl);
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

  // Display "Invalid Permissions" if the role is not "moderator"
  if (userRole !== 'moderator') return <p>Invalid Permissions</p>;

  // Display error message if fetching fails
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articles-container">
      <h1>Pending Articles for Moderation</h1>
      {/* Conditionally render list of articles or message if none found */}
      {articles.length > 0 ? (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article._id} className="article-item">
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

              <div className="article-actions-container">
                <p className="article-status">
                  <strong>Status:</strong>
                </p>

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
