import { request } from "../dist/index.js";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
// Example 1: GET request
async function getUser() {
  const result = await request<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  if (result.ok) {
    console.log("User:", result.data.name);
    console.log("Email:", result.data.email);
  } else {
    console.error("GET failed:", result.error);
  }
}

// Example 2: POST request
async function createPost() {
  const result = await request<NewPost>(
    "https://jsonplaceholder.typicode.com/users/1",
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
    console.log("Created post:", result.data);
  } else {
    console.error("POST failed:", result.error);
  }
}

// Example 3: GET request with query parameters
async function getPosts() {
  const result = await request<Post[]>(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      method: "GET",
      params: {
        userId: 1
      }
    }
  );

  if (result.ok) {
    console.log("Posts:", result.data);
  } else {
    console.error("GET posts failed:", result.error);
  }
}
// Example 4: PUT request
async function updatePost() {
  const result = await request<Post>(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      method: "PUT",
      body: {
        id: 1,
        title: "Updated TypeScript Project",
        body: "I am learning generics and discriminated unions.",
        userId: 1
      }
    }
  );

  if (result.ok) {
    console.log("Updated post:", result.data);
  } else {
    console.error("PUT failed:", result.error);
  }
}
// Example 5: DELETE request
async function deletePost() {
  const result = await request<unknown>(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      method: "DELETE"
    }
  );

  if (result.ok) {
    console.log("Post deleted successfully.");
  } else {
    console.error("DELETE failed:", result.error);
  }
}
// Example 6: GET request with custom headers
async function getWithHeaders() {
  const result = await request<User>(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      method: "GET",
      headers: {
        "X-Custom-Client": "typed-fetch",
        "X-Request-Version": "1"
      }
    }
  );

  if (result.ok) {
    console.log("Header request successful:", result.data.name);
  } else {
    console.error("Header request failed:", result.error);
  }
}
getUser();
createPost();
getPosts();
updatePost();
deletePost();
getWithHeaders();