"use client";

import { useState } from "react";
import PokemonSearch from "./components/PokemonSearch";
import PokemonList from "./components/PokemonList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">포켓몬 도감</h1>
      <PokemonSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      <PokemonList searchTerm={searchTerm} />
    </div>
  );
}
