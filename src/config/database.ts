import { Pool, PoolConfig } from "pg";

// Função para parsear DATABASE_URL (formato do Render)
function parseDatabaseUrl(url: string | undefined): PoolConfig | null {
  if (!url) return null;

  try {
    // Normaliza postgres:// para postgresql:// (ambos são suportados)
    const normalizedUrl = url.replace(/^postgres:\/\//, "postgresql://");
    const parsedUrl = new URL(normalizedUrl);
    
    return {
      host: parsedUrl.hostname,
      port: parseInt(parsedUrl.port) || 5432,
      user: parsedUrl.username,
      password: parsedUrl.password,
      database: parsedUrl.pathname.slice(1), // Remove a barra inicial
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    };
  } catch (error) {
    console.error("Erro ao parsear DATABASE_URL:", error);
    return null;
  }
}

// Configura a conexão com o banco
// Prioriza DATABASE_URL (formato do Render), depois variáveis individuais
const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL) || {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // SSL é obrigatório em produção (Render, Heroku, etc)
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false } 
    : false,
};

const pool = new Pool(dbConfig);

export default pool;
