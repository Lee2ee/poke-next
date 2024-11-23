import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import PokemonStats from "./PokemonStats";
import PokemonEvolution from "./PokemonEvolution";

interface pokemonDetailProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PokemonDeatail({ pokemon, isOpen, onClose }: pokemonDetailProps) {
  if (!pokemon) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {pokemon.name}
            <span className="text-gray-400">#{pokemon.id.toString().padStart(3, "0")}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <Image src={pokemon.gif || pokemon.image} alt={pokemon.name} width={200} height={200} className="mb-4" />
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <Badge key={type} variant="secondary">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <PokemonStats stats={pokemon.stats ?? []} />
            <PokemonEvolution evolutionChain={pokemon.evolutionChain ?? []} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
