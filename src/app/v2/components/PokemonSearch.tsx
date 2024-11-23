import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface PokemonSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}
export default function PokemonSearch({ searchTerm, onSearch }: PokemonSearchProps) {
  return (
    <Input
      type="text"
      placeholder="포켓몬 검색..."
      className="mb-6"
      value={searchTerm}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
    />
  );
}
