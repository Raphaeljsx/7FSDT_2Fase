import type { Post, PostCreate, PostUpdate } from "../types";
export declare const getAllPosts: () => Promise<Post[]>;
export declare const getPostById: (id: string | number) => Promise<Post>;
export declare const createPost: (data: PostCreate) => Promise<Post>;
export declare const updatePost: (id: string | number, data: PostUpdate) => Promise<Post>;
export declare const deletePost: (id: string | number) => Promise<void>;
export declare const searchPosts: (query: string) => Promise<Post[]>;
//# sourceMappingURL=post.service.d.ts.map