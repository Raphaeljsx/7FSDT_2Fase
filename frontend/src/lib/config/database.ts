import { Pool, type PoolConfig } from "pg";

const isDockerContainer = process.env.DOCKER_CONTAINER === "true";
const isCI =
  process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

if (!isDockerContainer && !isCI) {
  if (!process.env.DB_HOST || process.env.DB_HOST === "postgres") {
    process.env.DB_HOST = "localhost";
  }
  if (!process.env.DB_PORT || process.env.DB_PORT === "5432") {
    process.env.DB_PORT = "5433";
  }
}

function parseDatabaseUrl(url: string | undefined): PoolConfig | null {
  if (!url) return null;
  try {
    const normalizedUrl = url.replace(/^postgres:\/\//, "postgresql://");
    const parsedUrl = new URL(normalizedUrl);
    const isRenderHost = parsedUrl.hostname.includes(".render.com");
    return {
      host: parsedUrl.hostname,
      port: parseInt(parsedUrl.port) || 5432,
      user: parsedUrl.username,
      password: parsedUrl.password,
      database: parsedUrl.pathname.slice(1),
      ssl:
        process.env.NODE_ENV === "production" || isRenderHost
          ? { rejectUnauthorized: false }
          : false,
    };
  } catch {
    return null;
  }
}

const dbConfig =
  parseDatabaseUrl(process.env.DATABASE_URL) ||
  ({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "blog",
    ssl:
      process.env.NODE_ENV === "production" ||
      (process.env.DB_HOST?.includes(".render.com") ?? false)
        ? { rejectUnauthorized: false }
        : false,
  } as PoolConfig);

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(dbConfig);
  }
  return pool;
}

export default getPool;
