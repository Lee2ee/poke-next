import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemon";
import { forwardRef } from "react";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

export const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(({ pokemon, onClick }, ref) => {
  return (
    <div ref={ref} className="cursor-pointer" onClick={() => onClick?.(pokemon)}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-[250]">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">
            {pokemon.name} {pokemon.id.toString().padStart(3, "0")}
          </CardTitle>
          <CardContent className="p-4 pt-0">
            <Image
              src={pokemon.gif || pokemon.image}
              alt={pokemon.name}
              width={96}
              height={96}
              className="mx-auto mb-2"
            />
            <p className="text-center text-sm text-muted-foreground">타입: {pokemon.types.join(", ")}</p>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
});

PokemonCard.displayName = "PoekmonCard";
