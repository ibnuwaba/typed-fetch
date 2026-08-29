export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };

    interface User {
  id: string;
  name: string;
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number>;
  body?: unknown;
  headers?: Record<string, string>;
}

const success: Result<User> = {
  ok: true,
  data: {
    id: "1",
    name: "Sudeys"
  }
};

const failure: Result<User> = {
  ok: false,
  error: "User not found"
};

function handleResult(result: Result<User>) {
  if (result.ok) {
    console.log(result.data.name);
  } else {
    console.log(result.error);
  }
}
const options: RequestOptions = {
  method: "POST",
  params: {
    page: 1,
    search: "typescript"
  },
  body: {
    name: "Sudeys"
  },
  headers: {
    Authorization: "Bearer token"
  }
};