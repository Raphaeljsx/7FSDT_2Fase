import { NextRequest, NextResponse } from "next/server";
import * as postService from "@/lib/services/post.service";
import { getUserIdFromRequest } from "@/lib/auth/jwt";
import { ensurePostsTable } from "@/lib/db/init";
import { NotFoundError } from "@/lib/errors";
import { errorToResponse } from "@/lib/api/errorResponse";

export async function GET() {
  try {
    await ensurePostsTable();
    const posts = await postService.getAllPosts();
    if (!posts || posts.length === 0) {
      throw new NotFoundError("Nenhum post encontrado");
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("[GET /api/posts]", error);
    return errorToResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensurePostsTable();
    const userId = getUserIdFromRequest(request);
    const body = await request.json();
    const post = await postService.createPost({
      title: body.title,
      content: body.content,
      author_id: userId,
    });
    return NextResponse.json(
      { message: "Post criado com sucesso", post },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/posts]", error);
    return errorToResponse(error);
  }
}
