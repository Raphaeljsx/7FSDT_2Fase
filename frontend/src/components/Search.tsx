"use client"

import { useEffect, useState } from "react";

interface SearchProps {
  searchQuery?: string;
  onSearch: (query: string) => void;
}

export default function Search({ searchQuery = "", onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (searchQuery === "") setInputValue("");
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-center lg:w-1/2 w-5/6 2xl:w-1/3 my-10">
      <input
        value={inputValue}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
    </form>
  );
}
