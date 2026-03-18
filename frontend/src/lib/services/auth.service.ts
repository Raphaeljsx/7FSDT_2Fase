import { setToken, removeToken } from "../api/client";

export interface UserPublic {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
}

export interface AuthResponse {
  user: UserPublic;
  token: string;
}

async function authFetch(path: string, body: object): Promise<AuthResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Falha na requisição");
  }

  const data = await res.json();
  if (data.token) setToken(data.token);
  return { user: data.user, token: data.token };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const out = await authFetch("/api/auth/login", { email, password });
  return out;
}

export async function register(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<AuthResponse> {
  return authFetch("/api/auth/register", data);
}

export function logout(): void {
  removeToken();
}
