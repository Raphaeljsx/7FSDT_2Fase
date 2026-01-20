import pool from "./database";
import fs from "fs";
import path from "path";

interface ErrorWithCode extends Error {
  code?: string;
}

//verifica se o banco de dados está rodando e cria as tabelas se não existirem
async function initDatabase(): Promise<void> {
  try {
    await pool.query("SELECT 1");

    // Verifica se a tabela posts já existe antes de executar o SQL
    const tableExistsResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'posts'
      );
    `);

    const tableExists = tableExistsResult.rows[0].exists;

    // Só executa o SQL se a tabela não existir
    if (!tableExists) {
      const tablesSqlPath = path.join(__dirname, "../tables.sql");
      if (fs.existsSync(tablesSqlPath)) {
        const tablesSql = fs.readFileSync(tablesSqlPath, "utf8");
        await pool.query(tablesSql);
        console.log("Tabelas criadas com sucesso.");
      }
    } else {
      console.log("Tabelas já existem. Nenhuma alteração foi feita no banco de dados.");
    }
  } catch (error) {
    const dbError = error as ErrorWithCode;

    if (dbError.code === "ENOTFOUND" || dbError.code === "ECONNREFUSED") {
      console.error(
        "Erro de conexão com o banco de dados. Verifique se o PostgreSQL está rodando."
      );
      console.error(
        `Tentando conectar em: ${process.env.DB_HOST}:${process.env.DB_PORT}`
      );
      throw new Error(
        "Não foi possível conectar ao banco de dados. Certifique-se de que o Docker está rodando: docker-compose up -d postgres"
      );
    }
    throw error;
  }
}

export default initDatabase;
