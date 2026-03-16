"use client";
import { useEffect, useState } from "react";
import { PostType } from "../app/Types/Post";
import Link from "next/link";

interface PostListProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function PostList({ searchQuery = "", onClearSearch }: PostListProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filtered = !searchQuery?.trim()
    ? posts
    : posts.filter((p) =>
        [p.title, p.content, p.author].some((field) =>
          String(field).toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      );

  if (loading)
    return <p className="text-center text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (filtered.length === 0)
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-gray-600">Não há post correspondente à pesquisa.</p>
        <button
          type="button"
          onClick={() => onClearSearch?.()}
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
        >
          ← Retornar à página inicial
        </button>
      </div>
    );

  return (
    <div className="2xl:max-w-[1450px] xl:max-w-[1250px] lg:max-w-[1050px] md:max-w-[850px] max-w-[650px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((item: PostType, index: number) => (
        <div
          key={index}
          className="flex flex-col bg-zinc-50 dark:bg-gray-900 gap-2 rounded-lg shadow-md p-4"
        >
          <h2 className="text-2xl font-bold">
            <Link href={`/${item.id}`}>{item.title}</Link>
          </h2>
          <p className="text-gray-600">{item.content}</p>
          <p className="text-gray-600 text-sm">{item.author}</p>
          <span className="text-gray-600 text-sm">
            {new Date(item.created_at).toLocaleDateString()}
          </span>

          <div className="flex justify-end">
            <Link href={`/${item.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Acessar
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
