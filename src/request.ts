import type { RequestOptions, Result } from "./types.js";

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<Result<T>> {
  const {
    method = "GET",
    params,
    body,
    headers = {}
  } = options;

  const requestUrl = new URL(url);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      requestUrl.searchParams.set(key, String(value));
    }
  }

  try {
   const fetchOptions: RequestInit = {
  method,
  headers: {
    "Content-Type": "application/json",
    ...headers
  }
};

if (body !== undefined) {
  fetchOptions.body = JSON.stringify(body);
}

const response = await fetch(requestUrl, fetchOptions);
    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status}`
      };
    }

    const data = (await response.json()) as T;

    return {
      ok: true,
      data
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error
        ? error.message
        : "Network error"
    };
  }
}