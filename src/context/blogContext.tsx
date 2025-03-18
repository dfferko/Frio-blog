import { createContext, useContext, useEffect, useState } from "react";
import useFetchHook from "@/app/utils/useFetchHook";
import { blogListType } from "@/app/types/blogListType";

type BlogContextType = {
  blogs: blogListType[] | null;
  setBlogs: (blogs: blogListType[] | null) => void;
  isLoading: boolean;
  error: Error | null;
};
type blogProviderProps = {
  children: React.ReactNode;
};
const BlogContext = createContext<BlogContextType | undefined>(undefined);

export default function BlogProvider({ children }: blogProviderProps) {
  const url = "https://jsonfakery.com/blogs/random/30";
  const {
    data: fetchedBlogs,
    isLoading,
    error,
  } = useFetchHook<blogListType[]>(url);
  const [blogs, setBlogs] = useState<blogListType[] | null>(null);

  useEffect(() => {
    if (fetchedBlogs) {
      setBlogs(fetchedBlogs);
    }
  }, [fetchedBlogs]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, isLoading, error }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
}
