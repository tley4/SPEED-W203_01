import React from 'react'

const page = () => {
  return (
    <>
      <h1>Submission Form</h1>
      <form className="article-form">
        <div className="form-field">
          <input
            type="text"
            name="floating_title"
            id="floating_title"
            className="form-input"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_title"
            className="form-label"
          >
            Article Title
          </label>
        </div>

        <div className="form-field">
          <textarea
            name="floating_abstract"
            id="floating_abstract"
            rows={5}
            className="form-input"
            placeholder=" "
            required
          ></textarea>
          <label
             htmlFor="floating_abstract"
             className="form-label"
          >
            Abstract
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="floating_doi"
            id="floating_doi"
            className="form-input"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_doi"
            className="form-label"
          >
            DOI (Digital Object Identifier)
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="floating_keywords"
            id="floating_keywords"
            className="form-input"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_keywords"
            className="form-label"
          >
            Keywords
          </label>
        </div>

        <div className="form-field">
          <select
            name="floating_article_type"
            id="floating_article_type"
            className="form-input"
            required
          >
            <option value="" disabled selected>
              Select Article Type
            </option>
            <option value="Research Article">Research Article</option>
            <option value="Review Article">Review Article</option>
            <option value="Case Study">Case Study</option>
          </select>
          <label
            htmlFor="floating_article_type"
            className="form-label"
          >
            Article Type
          </label>
        </div>

        <div className="form-field">
          <input
            type="date"
            name="floating_publication_date"
            id="floating_publication_date"
            className="form-input"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_publication_date"
            className="form-label"
          >
            Publication Date
          </label>
        </div>

        <div className="form-field">
          <input
            type="text"
            name="floating_author"
            id="floating_author"
            className="form-input"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_author"
            className="form-label"
          >
            Author
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
      </>
  );  
}

export default page