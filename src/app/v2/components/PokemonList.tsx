"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Pokemon, koreanTypes } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  searchTerm: string;
}
export default function PokemonList({ searchTerm }: PokemonListProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 무한 스크롤을 위한 observer 설정
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // 포켓몬 데이터 가지고 오는 함수
  const fetchPokemon = async (offset: number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await response.json();
      console.log("Pokemon Data:", data);
      const results = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          // 1. 데이터 세팅
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();
          const speciesRes = await fetch(pokemonData.species.url);
          const speciesData = await speciesRes.json();

          // 2. 데이터 매핑
          const koreanName =
            speciesData.names.find((name: { language: { name: string } }) => name.language.name === "ko")?.name ||
            pokemonData.name;
          return {
            id: pokemonData.id,
            name: koreanName,
            types: pokemonData.types.map(
              (t: { type: { name: keyof typeof koreanTypes } }) => koreanTypes[t.type.name] || t.type.name
            ),
            image: pokemonData.sprites.front_default,
            gif: pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default,
          };
        })
      );
      return results;
    } catch (error) {
      console.error("포켓몬 데이터를 찾지 못했습니다.");
      return [];
    }
  };

  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true);
      const newPokemon = await fetchPokemon(offset);
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);
      setHasMore(newPokemon.length === 20);
      setIsLoading(false);
    };
    loadPokemon();
  }, [offset]);

  const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ScrollArea className="h-[80vh]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p, index) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            ref={index === filteredPokemon.length - 1 ? lastPokemonElementRef : undefined}
          />
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </ScrollArea>
  );
}
