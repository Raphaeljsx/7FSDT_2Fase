import { NextRequest, NextResponse } from "next/server";
import * as postService from "@/lib/services/post.service";
import { errorToResponse } from "@/lib/api/errorResponse";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const post = await postService.getPostById(id);
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return errorToResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const post = await postService.updatePost(id, body);
    return NextResponse.json(
      { message: "Post atualizado com sucesso", post },
      { status: 200 }
    );
  } catch (error) {
    return errorToResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    await postService.deletePost(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return errorToResponse(error);
  }
}
