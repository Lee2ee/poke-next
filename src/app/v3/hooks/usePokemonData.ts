import { useState, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokemonApi } from "../api/PokemonApi";

export default function usePokemonData(searchTerm: string) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true);
      const newPokemon = await pokemonApi.fetchPokemonWithDetails(offset);
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);
      setHasMore(newPokemon.length === 20);
      setIsLoading(false);
    };
    loadPokemon();
  }, [offset]);

  const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const loadMore = () => setOffset((prev) => prev + 20);
  return {
    pokemon: filteredPokemon,
    isLoading,
    hasMore,
    loadMore,
  };
}
