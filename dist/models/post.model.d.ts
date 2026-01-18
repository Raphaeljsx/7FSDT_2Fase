import { Post, type PostCreate, type PostUpdate } from "../types";
export declare const findAllPosts: () => Promise<Post[]>;
export declare const findByIdPost: (id: number) => Promise<Post | undefined>;
export declare const createPost: (data: PostCreate) => Promise<Post>;
export declare const updatePost: (data: PostUpdate & {
    id: number;
}) => Promise<Post>;
export declare const removePost: (id: number) => Promise<Post>;
export declare const searchPosts: (query: string) => Promise<Post[]>;
//# sourceMappingURL=post.model.d.ts.map