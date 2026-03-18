import getPool from "../config/database";
import type {
  userType,
  userCreateType,
  userUpdateType,
} from "../types/User";

export async function findAllUsers(): Promise<userType[]> {
  const pool = getPool();
  const result = await pool.query<userType>(
    `SELECT * FROM users ORDER BY created_at DESC`,
  );
  return result.rows;
}

export async function findByIdUser(id: number): Promise<userType | undefined> {
  const pool = getPool();
  const result = await pool.query<userType>(
    `SELECT * FROM users WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}

export async function findByEmailUser(
  email: string,
): Promise<userType | undefined> {
  const pool = getPool();
  const result = await pool.query<userType>(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );
  return result.rows[0];
}

export async function createUser(data: userCreateType): Promise<userType> {
  const pool = getPool();
  const result = await pool.query<userType>(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.email, data.password],
  );
  return result.rows[0];
}
