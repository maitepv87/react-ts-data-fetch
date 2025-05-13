import { type ReactNode } from "react";
import { useFetch } from "./hooks/useFetch.ts";
import { BlogPosts, BlogPost } from "./blog/BlogPosts.tsx";
import { ErrorMessage, LoadingSpinner } from "./components";

type DataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const { data, isLoading, hasError, error } = useFetch<DataBlogPost[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  let content: ReactNode;

  if (data) {
    const blogPosts: BlogPost[] = data.map((rawPost) => ({
      id: rawPost.id,
      title: rawPost.title,
      text: rawPost.body,
    }));

    content = <BlogPosts posts={blogPosts} />;
  }

  if (hasError) {
    content = <ErrorMessage text={error ?? "Unknown error"} />;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return <main>{content}</main>;
}

export default App;
