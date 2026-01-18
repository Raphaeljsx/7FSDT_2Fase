import "dotenv/config";
import app from "./app";
import initDatabase from "./config/init-db";

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