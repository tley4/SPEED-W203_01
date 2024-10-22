"use client";

import React, { useState } from 'react';

const SubmissionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    doi: '',
    keywords: '',
    articleType: '',
    publicationDate: '',
    author: '',
  });

  // For form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/articles/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Article submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting the article:', error);
    }
  };

  return (
    <>
      <h1>Submission Form</h1>
      <form className="article-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            name="title"
            id="floating_title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder=" "
            required
          />
          <label htmlFor="floating_title" className="form-label">
            Article Title
          </label>
        </div>

        <div className="form-field">
          <textarea
            name="abstract"
            id="floating_abstract"
            value={formData.abstract}
            onChange={handleChange}
            rows={5}
            className="form-input"
            placeholder=" "
            required
          ></textarea>
          <label htmlFor="floating_abstract" className="form-label">
            Abstract
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="doi"
            id="floating_doi"
            value={formData.doi}
            onChange={handleChange}
            className="form-input"
            placeholder=" "
          />
          <label htmlFor="floating_doi" className="form-label">
            DOI (Digital Object Identifier)
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="keywords"
            id="floating_keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="form-input"
            placeholder=" "
            required
          />
          <label htmlFor="floating_keywords" className="form-label">
            Keywords
          </label>
        </div>

        <div className="form-field">
          <select
            name="articleType"
            id="floating_article_type"
            value={formData.articleType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="" disabled>
              Select Article Type
            </option>
            <option value="Research Article">Research Article</option>
            <option value="Review Article">Review Article</option>
            <option value="Case Study">Case Study</option>
          </select>
          <label htmlFor="floating_article_type" className="form-label">
            Article Type
          </label>
        </div>

        <div className="form-field">
          <input
            type="date"
            name="publicationDate"
            id="floating_publication_date"
            value={formData.publicationDate}
            onChange={handleChange}
            className="form-input"
            placeholder=" "
            required
          />
          <label htmlFor="floating_publication_date" className="form-label">
            Publication Date
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="author"
            id="floating_author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder=" "
            required
          />
          <label htmlFor="floating_author" className="form-label">
            Author
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );  
}

export default SubmissionPage