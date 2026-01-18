import "dotenv/config";
import app from "./app";
import initDatabase from "./config/init-db";

// Ajusta configurações do banco apenas quando rodando localmente E usando Docker Compose
// Não ajusta se estiver em produção (Render, etc)
if (
  process.env.NODE_ENV !== "production" &&
  process.env.DB_HOST === "postgres" &&
  !process.env.DOCKER_CONTAINER
) {
  process.env.DB_HOST = "localhost";
  if (process.env.DB_PORT === "5432") {
    process.env.DB_PORT = "5433";
  }
}

const PORT: number = parseInt(process.env.PORT || "3000", 10);

(async (): Promise<void> => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`O server rodando na porta ${PORT}`);
    });
  } catch (error) {
    const err = error as Error;
    console.error("Erro ao iniciar a aplicação:", err.message);
    process.exit(1);
  }
})();