import pool from "./database";
import fs from "fs";
import path from "path";

interface ErrorWithCode extends Error {
  code?: string;
}

//verifica se o banco de dados está rodando e cria as tabelas se não existirem
async function initDatabase(): Promise<void> {
  try {
    // Testa a conexão
    await pool.query("SELECT 1");

    // Tenta encontrar o arquivo SQL em diferentes locais
    // Primeiro tenta no diretório de build (dist)
    let tablesSqlPath = path.join(__dirname, "../tables.sql");
    
    // Se não existir, tenta no diretório src (para desenvolvimento)
    if (!fs.existsSync(tablesSqlPath)) {
      tablesSqlPath = path.join(process.cwd(), "src", "tables.sql");
    }
    
    // Se ainda não existir, tenta na raiz
    if (!fs.existsSync(tablesSqlPath)) {
      tablesSqlPath = path.join(process.cwd(), "tables.sql");
    }

    if (fs.existsSync(tablesSqlPath)) {
      const tablesSql = fs.readFileSync(tablesSqlPath, "utf8");
      await pool.query(tablesSql);
      console.log("Tabelas criadas/verificadas com sucesso");
    } else {
      console.warn("Arquivo tables.sql não encontrado. As tabelas podem não existir.");
    }
  } catch (error) {
    const dbError = error as ErrorWithCode;

    console.error("Erro ao inicializar banco de dados:", error);
    console.error("DB_HOST:", process.env.DB_HOST);
    console.error("DB_PORT:", process.env.DB_PORT);
    console.error("DB_NAME:", process.env.DB_NAME);
    console.error("DB_USER:", process.env.DB_USER);

    if (dbError.code === "ENOTFOUND" || dbError.code === "ECONNREFUSED") {
      throw new Error(
        `Não foi possível conectar ao banco de dados em ${process.env.DB_HOST}:${process.env.DB_PORT}. Verifique as variáveis de ambiente.`
      );
    }
    throw error;
  }
}

export default initDatabase;
