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
exports.search = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const service = __importStar(require("../services/post.service"));
const errors_1 = require("../errors");
const getAll = async (_req, res) => {
    const posts = await service.getAllPosts();
    if (!posts || posts.length === 0)
        throw new errors_1.NotFoundError("Nenhum post encontrado");
    return res.status(200).json(posts);
};
exports.getAll = getAll;
const getById = async (req, res) => {
    const post = await service.getPostById(req.params.id);
    return res.status(200).json(post);
};
exports.getById = getById;
const create = async (req, res) => {
    const post = await service.createPost(req.body);
    return res.status(201).json({
        message: "Post criado com sucesso",
        post,
    });
};
exports.create = create;
const update = async (req, res) => {
    const post = await service.updatePost(req.params.id, req.body);
    return res.status(200).json({
        message: "Post atualizado com sucesso",
        post,
    });
};
exports.update = update;
const remove = async (req, res) => {
    await service.deletePost(req.params.id);
    return res.status(204).send();
};
exports.remove = remove;
const search = async (req, res) => {
    const searchQuery = req.query.q || req.query.query;
    if (!searchQuery)
        throw new errors_1.ValidationError("Query de busca é obrigatória");
    const posts = await service.searchPosts(searchQuery);
    return res.status(200).json(posts);
};
exports.search = search;
//# sourceMappingURL=post.controller.js.map