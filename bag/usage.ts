import { request } from "../dist/index.js";

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

async function createPost() {
  const result = await request<NewPost>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      body: {
        title: "Learning TypeScript",
        body: "I'm building a typed API client.",
        userId: 1
      }
    }
  );

  if (result.ok) {
    console.log("Created:", result.data);
  } else {
    console.error("Failed:", result.error);
  }
}

createPost();