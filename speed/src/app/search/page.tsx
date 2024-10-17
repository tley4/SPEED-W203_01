"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  _id: string;
    title: string;
    abstract: string;
    doi: string;
    keywords: string;
    articleType: string;
    publicationDate: Date,
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

//

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
    <div className="min-h-screen mt-4">
      <div className="flex justify-center items-center space-x-4 xl:w-3/4 mx-auto">
        <span className="font-bold text-2xl flex-shrink-0 whitespace-nowrap">
          Browse Articles
        </span>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full md:w-2/3 lg:w-1/2 xl:w-3/4 full border border-solid border-neutral-600 bg-white px-6 py-3 text-base font-normal leading-6 text-neutral-700 outline-none shadow-md transition duration-200 ease-in-out focus:z-[3] focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-blue-500"
          aria-label="Search"
        />
      </div>

      <div className="flex justify-center mt-2">
        <label className="mr-5">
          <input
            type="radio"
            name="searchType"
            value="title"
            checked={searchType === "title"}
            onChange={handleSearchTypeChange}
          />
          Search by Title
        </label>
        <label className="mr-5">
          <input
            type="radio"
            name="searchType"
            value="sePractice"
            checked={searchType === "sePractice"}
            onChange={handleSearchTypeChange}
          />
          Search by SE Practice
        </label>
        <label className="mr-5">
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

      <div className="mt-16">
        {isLoading ? (
          <div className="text-center">Loading articles...</div>
        ) : (
          <div className="px-4 md:px-8">
            <table className="min-w-full table-auto border border-blue-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-1 text-center font-bold w-50">Title</th>
                  <th className="border px-3 py-1 text-center font-bold w-30">Abstract</th>
                  <th className="border px-3 py-1 text-center font-bold w-50">DOI</th>
                  <th className="border px-3 py-1 text-center font-bold w-50">Keywords</th>
                  <th className="border px-3 py-1 text-center font-bold w-40">Article Type</th>
                  <th className="border px-3 py-1 text-center font-bold w-40">Publication Date</th>              
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article._id}>
                      <td className="border px-4 py-2 truncate">
                        <Link
                          href={`/pages/browse/${article._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="border px-3 py-1 truncate">{article.title}</td>
                      <td className="border px-3 py-1 truncate">{article.abstract}</td>
                      <td className="border px-3 py-1 truncate">{article.doi || "N/A"}</td>
                      <td className="border px-3 py-1 truncate">{article.keywords || "N/A"}</td>
                      <td className="border px-3 py-1 truncate">{article.articleType || "N/A"}</td>
                      <td className="border px-3 py-1 truncate">{article.publicationDate.toString()}</td>
                       </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No articles found.
                    </td>
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