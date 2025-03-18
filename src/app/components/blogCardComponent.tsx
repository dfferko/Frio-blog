"use client";
import React from "react";
import { blogListType } from "../types/blogListType";
import Link from "next/link";
import "@/app/css/bloglist.css";
interface CardProps {
  blog: blogListType;
  variant?: "default" | "related";
}

export default function BlogCardComponent({
  blog,
  variant = "default",
}: CardProps) {
  return (
    <div className={`blog-card ${variant}`}>
      <div className="blog-content">
        {variant === "related" && (
          <img src={blog.featured_image} alt={blog.title} width={150} />
        )}
        <span className="blog-category">{blog.category}</span>
        <h2 className="blog-title">{blog.title}</h2>
        {variant === "default" && (
          <p className="blog-subtitle">{blog.subtitle}</p>
        )}
        <p className="blog-date">{blog.created_at}</p>
        <Link
          className="blog-link"
          href={`/blogs/${blog.id}`}
          title={`Čítať viac o ${blog.title}`}
        >
          Čítať viac
        </Link>
      </div>
    </div>
  );
}
