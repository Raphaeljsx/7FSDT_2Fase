import { NextRequest, NextResponse } from "next/server";
import * as postService from "@/lib/services/post.service";
import { NotFoundError } from "@/lib/errors";
import { errorToResponse } from "@/lib/api/errorResponse";

export async function GET() {
  try {
    const posts = await postService.getAllPosts();
    if (!posts || posts.length === 0) {
      throw new NotFoundError("Nenhum post encontrado");
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorToResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await postService.createPost(body);
    return NextResponse.json(
      { message: "Post criado com sucesso", post },
      { status: 201 }
    );
  } catch (error) {
    return errorToResponse(error);
  }
}
