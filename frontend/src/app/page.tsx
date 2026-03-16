"use client";

import PostList from "@/components/PostList";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 font-sans">
     <h1 className="text-4xl font-bold text-center mb-4">Artigos</h1>
      <Search searchQuery={searchQuery} onSearch={setSearchQuery} />
      <PostList searchQuery={searchQuery} onClearSearch={() => setSearchQuery("")} />
    </div>
  );
}
