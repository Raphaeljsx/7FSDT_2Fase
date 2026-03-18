"use client";

import type { PostType } from "@/app/Types/Post";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post não encontrado");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center text-gray-600">Carregando...</p>
  if (error) return <p className="text-center text-red-600">Erro ao carregar post</p>
  if (!post) return <p className="text-center text-gray-600">Post não encontrado</p>

  return (
    <div className="flex flex-col min-h-screen p-4 bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" className="text-blue-600 hover:underline mb-4">
        ← Voltar aos posts
      </Link>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">
          {post.author?.name?.trim() || post.author?.email || "Anônimo"}
        </p>
        <time className="text-gray-500 text-sm block mb-4">
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <p className="text-lg">{post.content}</p>
      </article>
    </div>
  );
}
