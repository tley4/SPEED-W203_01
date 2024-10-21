'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Articles List</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
              <p>Author: {article.author}</p>
              <p>Published on: {article.publicationDate}</p>
              <p>Status: {article.moderationStatus}</p>
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
