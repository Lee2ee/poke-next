import { ScrollArea } from "@/components/ui/scroll-area";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import usePokemonData from "../hooks/usePokemonData";
import { PokemonCard } from "./PokemonCard";
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { Loader2 } from "lucide-react";
import PokemonDeatail from "./PokemonDetail";

interface PokemonListProps {
  searchTerm: string;
}

export default function PokemonList({ searchTerm }: PokemonListProps) {
  // 포켓몬 데이터를 처리
  const { pokemon, isLoading, hasMore, loadMore } = usePokemonData(searchTerm);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  // 인피니티 스크롤
  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: loadMore,
  });
  return (
    <>
      <ScrollArea className="h-[80vh]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {pokemon.map((p, index) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              ref={index === pokemon.length - 1 ? lastElementRef : undefined}
              onClick={setSelectedPokemon}
            />
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center items-center wt-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </ScrollArea>
      <PokemonDeatail pokemon={selectedPokemon} isOpen={!!selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </>
  );
}
