"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Article {
  _id: string;
  title: string;
  authors: string;
  source: string;
  publicationDate: Date;
  doi: string;
  claim: string;
  evidence: string;
  rating: number[];
  status: string;
  sePractice: string;
  articleType: string;
}

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [newRating, setNewRating] = useState<number>(0);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/articles/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const averageRating = article.rating && article.rating.length > 0 
    ? (article.rating.reduce((acc, curr) => acc + curr, 0) / article.rating.length).toFixed(1) 
    : "No ratings yet";

  return (
    <div className="article-details-page">
      <div className="article-details-container">
        <h1 className="article-title">Title: {article.title}</h1>
        <p className="article-detail"><strong>Authors:</strong> {article.authors}</p>
        <p className="article-detail"><strong>Source:</strong> {article.source}</p>
        <p className="article-detail"><strong>Publication Date:</strong> {new Date(article.publicationDate).toDateString()}</p>
        <p className="article-detail"><strong>DOI:</strong> {article.doi}</p>
        <p className="article-detail"><strong>Claim:</strong> {article.claim || "N/A"}</p>
        <p className="article-detail"><strong>Evidence:</strong> {article.evidence || "N/A"}</p>
        <p className="article-detail"><strong>Average Rating:</strong> {averageRating}/5</p>
        <p className="article-detail"><strong>Status:</strong> {article.status || "N/A"}</p>
        <p className="article-detail"><strong>SE Practice:</strong> {article.sePractice}</p>
        <p className="article-detail"><strong>Research Type:</strong> {article.articleType}</p>

        <div className="rating-section">
          <label htmlFor="rating" className="rating-label">Add Rating:</label>
          <select
            id="rating"
            name="rating"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            required
            className="rating-select"
          >
            <option value="0" disabled>Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            type="button"
            onClick={async () => {
              try {
                const response = await fetch(`http://localhost:5000/articles/${id}/rate`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rating: newRating }),
                });
                if (response.ok) {
                  const updatedArticle = await response.json();
                  setArticle(updatedArticle);
                  alert('Rating added successfully!');
                } else {
                  console.error('Failed to add rating');
                }
              } catch (error) {
                console.error("Error submitting rating:", error);
              }
            }}
            className="rating-button"
          >
            Rate Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
