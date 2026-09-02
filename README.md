# typed-fetch

A small, type-safe HTTP client built with TypeScript.

`typed-fetch` provides a generic `request<T>()` helper for making API requests while keeping response data and errors type-safe.

This project was built to practice TypeScript generics, unions, narrowing, and discriminated unions in a practical API-client project.

## Features

* Supports **GET, POST, PUT, and DELETE** requests
* Typed **query parameters**
* JSON **request bodies**
* Custom **headers**
* Generic `request<T>()` for typed responses
* Discriminated `Result<T>` for explicit success and error handling
* Network and HTTP errors are returned instead of leaking from the helper

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ibnuwaba/typed-fetch.git
cd typed-fetch
pnpm install
```

Build the TypeScript project:

```bash
pnpm build
```
## Usage

### 1. GET request

Define the expected response type and pass it to `request<T>()`:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const result = await request<User>(
  "https://api.example.com/users/1"
);

if (result.ok) {
  console.log(result.data.name);
} else {
  console.error("Request failed:", result.error);
}
```

The generic `User` type flows through `request<T>()`, so TypeScript knows that `result.data` is a `User`.

### 2. POST request

Send a typed JSON body and receive a typed response:

```ts
interface NewPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const result = await request<NewPost>(
  "https://api.example.com/posts",
  {
    method: "POST",
    body: {
      title: "Learning TypeScript",
      body: "Building a typed HTTP client.",
      userId: 1
    }
  }
);

if (result.ok) {
  console.log("Created:", result.data);
} else {
  console.error("POST failed:", result.error);
}
```

### 3. Query parameters and custom headers

Pass typed query parameters and custom headers:

```ts
const result = await request<User>(
  "https://jsonplaceholder.typicode.com/users/1"
);
  {
    params: {
      page: 1,
      limit: 10
    },
    headers: {
      Authorization: "Bearer token"
    }
  }
);

if (result.ok) {
  console.log("Users:", result.data);
} else {
  console.error("Request failed:", result.error);
}
```
## Error Handling

`request<T>()` does not expose errors as thrown exceptions. Instead, it returns a discriminated union:

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

The `ok` property acts as the discriminant. TypeScript narrows the result automatically:

```ts
if (result.ok) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

This makes both success and failure cases explicit and type-safe.

## TypeScript Concepts

This project applies the main concepts from the TypeScript Week 3 lesson:

* **Generics** — `request<T>()` preserves the expected response type.
* **Union types** — HTTP methods are restricted to supported values.
* **Discriminated unions** — `Result<T>` represents success or failure.
* **Narrowing** — checking `result.ok` determines which result branch is available.
* **Utility types / `Record`** — used for flexible, typed query parameters and headers.
* **Strict typing** — the project is compiled with TypeScript strict checking enabled.
