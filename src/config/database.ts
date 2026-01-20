import "dotenv/config";
import { Pool, PoolConfig } from "pg";

// Ajusta configurações do banco quando rodando localmente (fora do Docker)
// Se não estamos explicitamente em um container Docker, usa localhost:5433
// Mas não ajusta em ambientes CI (GitHub Actions, etc)
const isDockerContainer = process.env.DOCKER_CONTAINER === "true";
const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

if (!isDockerContainer && !isCI) {
  // Se DB_HOST é "postgres" (nome do container) ou não está definido,
  // ajusta para "localhost" para conectar do host ao container
  if (!process.env.DB_HOST || process.env.DB_HOST === "postgres") {
    process.env.DB_HOST = "localhost";
  }
  // Ajusta a porta para 5433 (porta exposta pelo docker-compose)
  // Só ajusta se a porta não estiver explicitamente definida
  if (!process.env.DB_PORT || process.env.DB_PORT === "5432") {
    process.env.DB_PORT = "5433";
  }
}

// Função para parsear DATABASE_URL (formato do Render)
function parseDatabaseUrl(url: string | undefined): PoolConfig | null {
  if (!url) return null;

  try {
    // Normaliza postgres:// para postgresql:// (ambos são suportados)
    const normalizedUrl = url.replace(/^postgres:\/\//, "postgresql://");
    const parsedUrl = new URL(normalizedUrl);
    
    // Detecta se é um host do Render (contém .render.com)
    const isRenderHost = parsedUrl.hostname.includes('.render.com');
    
    return {
      host: parsedUrl.hostname,
      port: parseInt(parsedUrl.port) || 5432,
      user: parsedUrl.username,
      password: parsedUrl.password,
      database: parsedUrl.pathname.slice(1), // Remove a barra inicial
      // SSL é obrigatório para Render (mesmo em desenvolvimento)
      ssl: (process.env.NODE_ENV === "production" || isRenderHost) 
        ? { rejectUnauthorized: false } 
        : false,
    };
  } catch (error) {
    console.error("Erro ao parsear DATABASE_URL:", error);
    return null;
  }
}

// Configura a conexão com o banco
// Prioriza DATABASE_URL (formato do Render), depois variáveis individuais
const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL) || {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "blog",
  // SSL é obrigatório para Render (mesmo em desenvolvimento)
  // Detecta se é host do Render
  ssl: (process.env.NODE_ENV === "production" || 
        (process.env.DB_HOST && process.env.DB_HOST.includes('.render.com'))) 
    ? { rejectUnauthorized: false } 
    : false,
};

// Log de debug (apenas em desenvolvimento)
if (process.env.NODE_ENV !== "production") {
  console.log("Configuração do banco de dados:", {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    database: dbConfig.database,
  });
}

const pool = new Pool(dbConfig);

export default pool;