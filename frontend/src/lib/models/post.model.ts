import getPool from "../config/database";
import type { Post, PostCreate, PostUpdate } from "../types/post";

const POST_SELECT = `
  SELECT p.id, p.title, p.content, p.author_id, p.created_at, p.updated_at,
         u.id AS author_id_ref, u.name AS author_name, u.email AS author_email
  FROM posts p
  INNER JOIN users u ON p.author_id = u.id
`;

function rowToPost(row: {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
  author_id_ref: number;
  author_name: string | null;
  author_email: string;
}): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: {
      id: row.author_id_ref,
      name: row.author_name,
      email: row.author_email,
    },
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function findAllPosts(): Promise<Post[]> {
  const pool = getPool();
  const result = await pool.query(
    `${POST_SELECT} ORDER BY p.created_at DESC`
  );
  return result.rows.map(rowToPost);
}

export async function findByIdPost(id: number): Promise<Post | undefined> {
  const pool = getPool();
  const result = await pool.query(
    `${POST_SELECT} WHERE p.id = $1`,
    [id]
  );
  const row = result.rows[0];
  return row ? rowToPost(row) : undefined;
}

export async function createPost(data: PostCreate): Promise<Post> {
  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *`,
    [data.title, data.content, data.author_id]
  );
  const row = result.rows[0];
  const authorResult = await pool.query(
    `SELECT id, name, email FROM users WHERE id = $1`,
    [row.author_id]
  );
  const u = authorResult.rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: u
      ? { id: u.id, name: u.name, email: u.email }
      : undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function updatePost(
  data: PostUpdate & { id: number }
): Promise<Post> {
  const pool = getPool();
  const result = await pool.query(
    `UPDATE posts SET title = $1, content = $2, updated_at = now() WHERE id = $3 RETURNING *`,
    [data.title, data.content, data.id]
  );
  const row = result.rows[0];
  if (!row) throw new Error("Post não encontrado");
  const authorResult = await pool.query(
    `SELECT id, name, email FROM users WHERE id = $1`,
    [row.author_id]
  );
  const u = authorResult.rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    author_id: row.author_id,
    author: u
      ? { id: u.id, name: u.name, email: u.email }
      : undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function removePost(id: number): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

export async function searchPosts(query: string): Promise<Post[]> {
  const pool = getPool();
  const pattern = `%${query}%`;
  const result = await pool.query(
    `${POST_SELECT}
     WHERE p.title ILIKE $1 OR p.content ILIKE $1
        OR u.name ILIKE $1 OR u.email ILIKE $1
     ORDER BY p.created_at DESC`,
    [pattern]
  );
  return result.rows.map(rowToPost);
}
