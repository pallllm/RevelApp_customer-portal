import { headers } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE;
const API_TOKEN = process.env.WP_API_TOKEN;

export class ApiClientError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export const fetchFromWp = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!API_BASE) {
    throw new ApiClientError("NEXT_PUBLIC_WP_API_BASE が設定されていません。");
  }
  const url = `${API_BASE}${path}`;
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {})
  };

  // Example: pass along cookies (for cookie-based auth)
  const incomingHeaders = headers();
  const cookie = incomingHeaders.get("cookie");
  if (cookie) {
    defaultHeaders.Cookie = cookie;
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new ApiClientError(`WP API error (${response.status}): ${body}`, response.status);
  }

  return (await response.json()) as T;
};
