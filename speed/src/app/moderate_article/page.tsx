'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Articles.css';

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
  // Manage the articles, loading state, and error state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch articles from backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
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
      <h1>Articles List</h1>
      {/* Conditionally render list of articles or message if none found */}
      {articles.length > 0 ? (
        <ul className="article-list">
          {/* Map through the list of articles */}
          {articles.map((article) => (
            <li key={article._id} className="article-item">
              <div className="article-details">
                <h3>{article.title}</h3>
                <p>{article.abstract}</p>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Published on:</strong> {new Date(article.publicationDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {article.moderationStatus}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticlesPage;
