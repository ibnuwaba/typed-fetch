export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number>;
  body?: unknown;
  headers?: Record<string, string>;
}
