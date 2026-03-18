import getPool from "../config/database";

const USERS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );
`;

const POSTS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );
`;

const POSTS_INDEX_SQL = `CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);`;

let usersInitialized = false;
let postsInitialized = false;

export async function ensureUsersTable(): Promise<void> {
  if (usersInitialized) return;
  const pool = getPool();
  await pool.query(USERS_TABLE_SQL);
  usersInitialized = true;
}

export async function ensurePostsTable(): Promise<void> {
  await ensureUsersTable();
  if (postsInitialized) return;
  const pool = getPool();
  await pool.query(POSTS_TABLE_SQL);
  await pool.query(POSTS_INDEX_SQL);
  postsInitialized = true;
}
