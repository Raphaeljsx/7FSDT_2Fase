"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const init_db_1 = __importDefault(require("./config/init-db"));
// Ajusta configurações do banco quando rodando localmente (fora do Docker)
// Se DB_HOST for "postgres" (nome do container), ajusta para "localhost"
if (process.env.DB_HOST === "postgres" && !process.env.DOCKER_CONTAINER) {
    process.env.DB_HOST = "localhost";
    // Ajusta a porta também, pois docker-compose expõe na 5433
    if (process.env.DB_PORT === "5432") {
        process.env.DB_PORT = "5433";
    }
}
const PORT = parseInt(process.env.PORT || "3000", 10);
(async () => {
    try {
        await (0, init_db_1.default)();
        app_1.default.listen(PORT, "0.0.0.0", () => {
            console.log(`O server rodando na porta ${PORT}`);
        });
    }
    catch (error) {
        const err = error;
        console.error("Erro ao iniciar a aplicação:", err.message);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map