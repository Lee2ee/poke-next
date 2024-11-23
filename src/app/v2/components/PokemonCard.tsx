import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  ref?: (node: HTMLDivElement | null) => void;
}
export default function PokemonCard({ pokemon, ref }: PokemonCardProps) {
  return (
    <div ref={ref}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-[250px]">
        <CardHeader className="pokemon-4">
          <CardTitle className="text-lg">
            {pokemon.name} {pokemon.id.toString().padStart(3, "0")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pokemon-4 pt-0">
          <Image
            src={pokemon.gif || pokemon.image}
            alt={pokemon.name}
            width={96}
            height={96}
            className="mx-auto mb-2"
          />
        </CardContent>
      </Card>
    </div>
  );
}
