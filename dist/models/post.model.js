"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.removePost = exports.updatePost = exports.createPost = exports.findByIdPost = exports.findAllPosts = void 0;
const database_1 = __importDefault(require("../config/database"));
const findAllPosts = async () => {
    const result = await database_1.default.query(`SELECT * FROM posts ORDER BY created_at DESC`);
    return result.rows;
};
exports.findAllPosts = findAllPosts;
const findByIdPost = async (id) => {
    const result = await database_1.default.query(`SELECT * FROM posts WHERE id = $1`, [
        id,
    ]);
    return result.rows[0];
};
exports.findByIdPost = findByIdPost;
const createPost = async (data) => {
    const result = await database_1.default.query(`INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *`, [data.title, data.content, data.author]);
    return result.rows[0];
};
exports.createPost = createPost;
const updatePost = async (data) => {
    const result = await database_1.default.query(`UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *`, [data.title, data.content, data.author, data.id]);
    return result.rows[0];
};
exports.updatePost = updatePost;
const removePost = async (id) => {
    const result = await database_1.default.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
exports.removePost = removePost;
const searchPosts = async (query) => {
    const result = await database_1.default.query(`SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR author ILIKE $1`, [`%${query}%`]);
    return result.rows;
};
exports.searchPosts = searchPosts;
//# sourceMappingURL=post.model.js.map