'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../../css/search.css"

interface Article {
  _id: string;
  title: string;
  abstract: string;
  doi: string;
  keywords: string;
  articleType: string;
  publicationDate: Date;
  author: string;
}

const BrowsePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"title" | "sePractice" | "publicationYear">("title");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm === "") {
      fetchArticles();
    } else {
      const delayDebounceFn = setTimeout(() => {
        searchArticles(searchTerm, searchType);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, searchType]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchArticles = async (term: string, type: "title" | "sePractice" | "publicationYear") => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();
      query.append(type, term);

      const response = await fetch(`http://localhost:5000/articles/search?${query.toString()}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error searching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as "title" | "sePractice" | "publicationYear");
    setSearchTerm("");
  };

  return (
    <div className="browse-page">
      <div className="search-container">
        <span className="search-title">Browse Articles</span>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search"
          placeholder="Enter search term..."
        />
      </div>

      <div className="search-filters">
        <label>
          <input
            type="radio"
            name="searchType"
            value="title"
            checked={searchType === "title"}
            onChange={handleSearchTypeChange}
          />
          Search by Title
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="sePractice"
            checked={searchType === "sePractice"}
            onChange={handleSearchTypeChange}
          />
          Search by SE Practice
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="publicationYear"
            checked={searchType === "publicationYear"}
            onChange={handleSearchTypeChange}
          />
          Search by Year
        </label>
      </div>

      <div className="articles-container">
        {isLoading ? (
          <div className="loading-text">Loading articles...</div>
        ) : (
          <div className="articles-table-wrapper">
            <table className="articles-table">
              <thead>
                <tr className="table-header">
                  <th>Title</th>
                  <th>Abstract</th>
                  <th>DOI</th>
                  <th>Keywords</th>
                  <th>Article Type</th>
                  <th>Publication Date</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article._id} className="table-row">
                      <td className="truncate">
                        <Link href={`/pages/browse/${article._id}`} className="article-link">
                          {article.title}
                        </Link>
                      </td>
                      <td className="truncate">{article.abstract}</td>
                      <td className="truncate">{article.doi || "N/A"}</td>
                      <td className="truncate">{article.keywords || "N/A"}</td>
                      <td className="truncate">{article.articleType || "N/A"}</td>
                      <td className="truncate">{article.publicationDate.toString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="no-articles-found">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
