import { NextRequest, NextResponse } from "next/server";
import * as postService from "@/lib/services/post.service";
import { ensurePostsTable } from "@/lib/db/init";
import { ValidationError } from "@/lib/errors";
import { errorToResponse } from "@/lib/api/errorResponse";

export async function GET(request: NextRequest) {
  try {
    await ensurePostsTable();
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") ?? searchParams.get("query");

    if (!searchQuery) {
      throw new ValidationError("Query de busca é obrigatória");
    }

    const posts = await postService.searchPosts(searchQuery);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorToResponse(error);
  }
}
