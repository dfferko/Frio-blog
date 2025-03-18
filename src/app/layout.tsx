"use client";
import "./globals.css";
import BlogProvider, { useBlogContext } from "@/context/blogContext";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <BlogProvider>
          <AppContent>{children}</AppContent>
        </BlogProvider>
      </body>
    </html>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { blogs, isLoading, error } = useBlogContext();

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-message">Error: {error.message}</div>
        </div>
      ) : blogs ? (
        <>
          <header className="main-header">
            <Link href={"/blogs"} className="nadpis">
              <h1>Frio blogs</h1>
            </Link>
          </header>
          {children}
          <footer className="main-footer">
            <p>Martin Bednár, 2025</p>
          </footer>
        </>
      ) : null}
    </>
  );
}
