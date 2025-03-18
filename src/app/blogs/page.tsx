"use client";
import { useState, useMemo } from "react";
import { useBlogContext } from "@/context/blogContext";
import "@/app/css/bloglist.css";
import BlogCardComponent from "../components/blogCardComponent";

export default function BlogList() {
  const { blogs, isLoading, error } = useBlogContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [limit, setLimit] = useState<number>(12);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const categories = useMemo(
    () => [...new Set(blogs?.map((blog) => blog.category) || [])],
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    return selectedCategory === "all"
      ? blogs?.slice(0, limit)
      : blogs
          ?.filter((blog) => blog.category === selectedCategory)
          .slice(0, limit);
  }, [blogs, selectedCategory, limit]);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSetLimit = (limitValue: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setLimit(limitValue);
      setIsAnimating(false);
    }, 300);
  };
  return (
    <div className="blog-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-message">Error: {error.message}</div>
        </div>
      ) : (
        <>
          <header>
            <select
              title="Categories"
              value={selectedCategory}
              onChange={handleSelectCategory}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="limit-buttons">
              <a
                title="Produktov na stránku"
                onClick={() => handleSetLimit(12)}
              >
                12 /
              </a>
              <a
                title="Produktov na stránku"
                onClick={() => handleSetLimit(24)}
              >
                24 /
              </a>
              <a
                title="Produktov na stránku"
                onClick={() => handleSetLimit(blogs?.length || 0)}
              >
                All
              </a>
            </div>
          </header>
          <div className={`blog-list ${isAnimating ? "fade-out" : "fade-in"}`}>
            {filteredBlogs?.map((blog) => (
              <BlogCardComponent key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
