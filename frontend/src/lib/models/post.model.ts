import getPool from "../config/database";
import type { Post, PostCreate, PostUpdate } from "../types/post";

export async function findAllPosts(): Promise<Post[]> {
  const pool = getPool();
  const result = await pool.query<Post>(
    `SELECT * FROM posts ORDER BY created_at DESC`
  );
  return result.rows;
}

export async function findByIdPost(id: number): Promise<Post | undefined> {
  const pool = getPool();
  const result = await pool.query<Post>(`SELECT * FROM posts WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function createPost(data: PostCreate): Promise<Post> {
  const pool = getPool();
  const result = await pool.query<Post>(
    `INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *`,
    [data.title, data.content, data.author]
  );
  return result.rows[0];
}

export async function updatePost(
  data: PostUpdate & { id: number }
): Promise<Post> {
  const pool = getPool();
  const result = await pool.query<Post>(
    `UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *`,
    [data.title, data.content, data.author, data.id]
  );
  return result.rows[0];
}

export async function removePost(id: number): Promise<Post> {
  const pool = getPool();
  const result = await pool.query<Post>(
    `DELETE FROM posts WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

export async function searchPosts(query: string): Promise<Post[]> {
  const pool = getPool();
  const result = await pool.query<Post>(
    `SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR author ILIKE $1`,
    [`%${query}%`]
  );
  return result.rows;
}
