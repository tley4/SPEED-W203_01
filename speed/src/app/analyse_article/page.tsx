'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/analyst.css';

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
  analystComment?: string;
  moderationStatus: string;
}

const AnalystPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState<string>('');

  // Fetch approved articles on component mount
  useEffect(() => {
    fetchApprovedArticles();
  }, []);

  const fetchApprovedArticles = async () => {
    try {
      const response = await axios.get<Article[]>('http://localhost:5000/articles/approved');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching approved articles:', error);
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  // Submit article with analyst comment
  const handleSubmit = async (articleId: string) => {
    try {
      await axios.patch(`http://localhost:5000/articles/${articleId}/analyst-submit`, {
        analystComment: comment,
      });
      fetchApprovedArticles(); // Refresh the list of approved articles
      setSelectedArticle(null); // Clear selected article
      setComment(''); // Clear comment field
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='articles-body'>
        <div className="articles-container">
          <h1>Approved Articles for Analyst Review</h1>
          {articles.length > 0 ? (
            <ul className="article-list">
              {articles.map((article) => (
                <li key={article._id} className="article-item">
                  <div className="article-content">
                    <h3><strong>Title:</strong> {article.title}</h3>
                    <p><strong>Abstract:</strong> {article.abstract}</p>
                    <p><strong>DOI:</strong> {article.doi || 'N/A'}</p>
                    <p><strong>Keywords:</strong> {article.keywords || 'N/A'}</p>
                    <p><strong>Type:</strong> {article.articleType}</p>
                    <p><strong>Published on:</strong> {new Date(article.publicationDate).toLocaleDateString()}</p>
                    <p><strong>Author:</strong> {article.author}</p>
                    <button 
                      className="submit-btn" 
                      onClick={() => setSelectedArticle(article)}
                    >
                      Review
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No approved articles found for review.</p>
          )}

          {selectedArticle && (
            <div className="article-review-form">
              <h2>Reviewing: {selectedArticle.title}</h2>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add additional comments here"
                className="comment-box"
              />
              <button
                onClick={() => handleSubmit(selectedArticle._id)}
                className="submit-btn"
                disabled={!comment}
              >
                Submit Article
              </button>
            </div>
          )}
        </div>
    </div>
    
  );
};

export default AnalystPage;