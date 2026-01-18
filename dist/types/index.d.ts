interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: Date;
    updated_at: Date;
}
interface PostCreate {
    title: string;
    content: string;
    author: string;
}
interface PostUpdate {
    title?: string;
    content?: string;
    author?: string;
}
import { Request, Response } from "express";
interface TypedRequest<T = any> extends Request {
    body: T;
    params: any;
    query: any;
}
interface TypedResponse<T = any> extends Response {
    json: (body: T) => this;
}
export { Post, PostCreate, PostUpdate, TypedRequest, TypedResponse };
//# sourceMappingURL=index.d.ts.map