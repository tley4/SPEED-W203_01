'use client';

import React, { useState, useEffect } from 'react';
import StarRating from './starRating';
import "../../css/dashboard.css";

interface Article {
  _id: string;
  title: string;
  abstract: string;
  doi: string;
  sePractice: string;
  articleType: string;
  publicationDate: string;
  author: string;
  averageRating: number | null; // Add averageRating field
}

const DashboardPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'title',
    'abstract',
    'author',
  ]);

  // Fetch submitted articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/articles/submitted');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  // Handle column selection
  const handleColumnToggle = (column: string) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h1>Dashboard</h1>

        <div className="column-selection">
          <h2>Select Columns to Display</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('title')}
                onChange={() => handleColumnToggle('title')}
              />
              Title
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('abstract')}
                onChange={() => handleColumnToggle('abstract')}
              />
              Abstract
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('author')}
                onChange={() => handleColumnToggle('author')}
              />
              Author
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('publicationDate')}
                onChange={() => handleColumnToggle('publicationDate')}
              />
              Publication Date
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('sePractice')}
                onChange={() => handleColumnToggle('sePractice')}
              />
              SE Practice
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColumns.includes('articleType')}
                onChange={() => handleColumnToggle('articleType')}
              />
              Article Type
            </label>
          </div>
        </div>
      </div>

      <div className="article-list-container">
        <div className="article-list">
          {articles.map((article) => (
            <div key={article._id} className="article-item">
              <div className="article-content">
                {selectedColumns.includes('title') && <h3>{article.title}</h3>}
                {selectedColumns.includes('abstract') && <p>{article.abstract}</p>}
                {selectedColumns.includes('author') && (
                  <p>
                    <strong>Author:</strong> {article.author}
                  </p>
                )}
                {selectedColumns.includes('publicationDate') && (
                  <p>
                    <strong>Publication Date:</strong> {article.publicationDate}
                  </p>
                )}
                {selectedColumns.includes('sePractice') && (
                  <p>
                    <strong>SE Practice:</strong> {article.sePractice}
                  </p>
                )}
                {selectedColumns.includes('articleType') && (
                  <p>
                    <strong>Article Type:</strong> {article.articleType}
                  </p>
                )}
              </div>

              {/* Star Rating Component */}
              <div className="article-rating">
                <h3><strong>Rating</strong></h3>
                {article.averageRating !== null ? (
                  <p><strong>Average Rating: </strong>{article.averageRating.toFixed(1)} / 5</p>
                ) : (
                  <p>No ratings yet</p>
                )}
                <StarRating articleId={article._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
