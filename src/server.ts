import "dotenv/config";
import app from "./app";
import initDatabase from "./config/init-db";

// Debug temporário - remover depois
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("NODE_ENV:", process.env.NODE_ENV);

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