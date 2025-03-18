export type blogListType = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  created_at: string;
  featured_image: string;
  summary: string;
  main_content: string;
};
export type UseFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
