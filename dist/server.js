"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const init_db_1 = __importDefault(require("./config/init-db"));
// Debug temporário - remover depois
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("NODE_ENV:", process.env.NODE_ENV);
const PORT = parseInt(process.env.PORT || "3000", 10);
(async () => {
    try {
        await (0, init_db_1.default)();
        app_1.default.listen(PORT, () => {
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