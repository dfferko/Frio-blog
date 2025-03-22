"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBlogContext } from "@/context/blogContext";
import { stripHTMLTags } from "@/app/utils/utils";
import "@/app/css/blogDetails.css";
import BlogCardComponent from "@/app/components/blogCardComponent";

export default function BlogPage() {
  const params = useParams();
  const id = params.id as string;
  const { blogs, isLoading, error } = useBlogContext();
  const [loadingTimer, setLoadingTimer] = useState<boolean>(true);
  const blog = blogs?.find((blog) => blog.id.toString() === id);
  const relatedBlogs =
    blogs
      ?.filter(
        (article) =>
          article.category === blog?.category && article.id !== blog?.id
      )
      .slice(0, 3) || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimer(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="blogDetails-container">
      {isLoading || loadingTimer ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-message">Error: {error.message}</div>
        </div>
      ) : !blog ? (
        <div className="error-container">
          <div className="error-message">
            <p>The requested blog could not be found.</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="blogDetails-parallax"
            style={{ backgroundImage: `url(${blog.featured_image})` }}
          ></div>
          <div className="blogDetails-content">
            <div className="blogDetails-card">
              <div className="category-badge">{blog.category}</div>
              <h1 className="blogDetails-title">{blog.title}</h1>
              <div className="blogDetails-meta">
                <span className="date">Published: {blog.created_at}</span>
              </div>
              <div className="blogDetails-text">
                <p>{stripHTMLTags(blog.main_content)}</p>
              </div>
            </div>
          </div>
          {relatedBlogs.length > 0 && (
            <>
              <div className="nadpis"><h1>Podobné blogy</h1></div>
              <div className="related-posts">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCardComponent
                    key={relatedBlog.id}
                    blog={relatedBlog}
                    variant="related"
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
