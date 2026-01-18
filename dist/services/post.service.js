"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const model = __importStar(require("../models/post.model"));
const errors_1 = require("../errors");
const getAllPosts = async () => {
    try {
        return await model.findAllPosts();
    }
    catch (error) {
        throw new Error(`Erro ao buscar posts: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
};
exports.getAllPosts = getAllPosts;
const getPostById = async (id) => {
    const idNumber = typeof id === "string" ? parseInt(id) : id;
    if (!idNumber || isNaN(idNumber))
        throw new errors_1.ValidationError("ID inválido");
    const post = await model.findByIdPost(idNumber);
    if (!post)
        throw new errors_1.NotFoundError("Post não encontrado");
    return post;
};
exports.getPostById = getPostById;
const createPost = async (data) => {
    const errors = [];
    if (!data.title || data.title.trim().length === 0)
        errors.push("Título é obrigatório");
    if (!data.content || data.content.trim().length === 0)
        errors.push("Conteúdo é obrigatório");
    if (!data.author || data.author.trim().length === 0)
        errors.push("Autor é obrigatório");
    if (errors.length > 0)
        throw new errors_1.ValidationError("Campos obrigatórios não preenchidos", errors);
    try {
        return await model.createPost(data);
    }
    catch (error) {
        throw new Error(`Erro ao criar post: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
};
exports.createPost = createPost;
const updatePost = async (id, data) => {
    const idNumber = typeof id === "string" ? parseInt(id) : id;
    if (!idNumber || isNaN(idNumber))
        throw new errors_1.ValidationError("ID inválido");
    const post = await model.findByIdPost(idNumber);
    if (!post)
        throw new errors_1.NotFoundError("Post não encontrado");
    const updateData = {
        id: idNumber,
        title: data.title !== undefined ? data.title : post.title,
        content: data.content !== undefined ? data.content : post.content,
        author: data.author !== undefined ? data.author : post.author,
    };
    try {
        return await model.updatePost(updateData);
    }
    catch (error) {
        throw new Error(`Error ao atualizar post: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
};
exports.updatePost = updatePost;
const deletePost = async (id) => {
    const idNumber = typeof id === "string" ? parseInt(id) : id;
    if (!idNumber || isNaN(idNumber))
        throw new errors_1.ValidationError("ID inválido");
    const post = await (0, exports.getPostById)(idNumber);
    if (!post)
        throw new errors_1.NotFoundError("Post não encontrado");
    try {
        await model.removePost(idNumber);
    }
    catch (error) {
        throw new Error(`Erro ao deletar post: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
};
exports.deletePost = deletePost;
const searchPosts = async (query) => {
    if (!query || query.trim().length === 0)
        throw new errors_1.ValidationError("Query de busca é obrigatória");
    try {
        const result = await model.searchPosts(query);
        return result;
    }
    catch (error) {
        throw new Error(`Erro ao buscar posts: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }
};
exports.searchPosts = searchPosts;
//# sourceMappingURL=post.service.js.map