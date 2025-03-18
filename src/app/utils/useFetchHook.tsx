import { useState, useEffect } from "react";
import { UseFetchResult } from "../types/blogListType";
export default function UseFetchHook<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Could not fetch data - ${response.status}`);
        }
        const result: T = await response.json();
        if (!signal.aborted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error && !signal.aborted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
