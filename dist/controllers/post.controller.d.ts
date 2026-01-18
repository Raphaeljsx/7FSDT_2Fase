import { Request, Response } from "express";
import type { PostCreate, PostUpdate } from "../types";
export declare const getAll: (_req: Request, res: Response) => Promise<Response>;
export declare const getById: (req: Request, res: Response) => Promise<Response>;
export declare const create: (req: Request<{}, {}, PostCreate>, res: Response) => Promise<Response>;
export declare const update: (req: Request<{
    id: string | number;
}, {}, PostUpdate>, res: Response) => Promise<Response>;
export declare const remove: (req: Request<{
    id: string | number;
}>, res: Response) => Promise<Response>;
export declare const search: (req: Request<{}, {}, {}, {
    q?: string;
    query?: string;
}>, res: Response) => Promise<Response>;
//# sourceMappingURL=post.controller.d.ts.map