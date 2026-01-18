"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//verifica se o banco de dados está rodando e cria as tabelas se não existirem
async function initDatabase() {
    try {
        await database_1.default.query("SELECT 1");
        const tablesSqlPath = path_1.default.join(__dirname, "../tables.sql");
        if (fs_1.default.existsSync(tablesSqlPath)) {
            const tablesSql = fs_1.default.readFileSync(tablesSqlPath, "utf8");
            await database_1.default.query(tablesSql);
        }
    }
    catch (error) {
        const dbError = error;
        if (dbError.code === "ENOTFOUND" || dbError.code === "ECONNREFUSED") {
            console.error("Erro de conexão com o banco de dados. Verifique se o PostgreSQL está rodando.");
            console.error(`Tentando conectar em: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
            throw new Error("Não foi possível conectar ao banco de dados. Certifique-se de que o Docker está rodando: docker-compose up -d postgres");
        }
        throw error;
    }
}
exports.default = initDatabase;
//# sourceMappingURL=init-db.js.map