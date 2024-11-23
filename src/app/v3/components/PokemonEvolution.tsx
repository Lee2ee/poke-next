import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface PokemonEvolution {
  id: string;
  name: string;
  image: string;
  level: number;
}

interface PokemonEvolutionProps {
  evolutionChain: PokemonEvolution[];
}

export default function PokemonEvolution({ evolutionChain }: PokemonEvolutionProps) {
  if (evolutionChain.length <= 1) return null;
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg">진화</h3>
      <div className="flex items-center justify-center gap-2">
        {evolutionChain.map((pokemon, index) => (
          <>
            <div key={pokemon.id} className="text-center">
              <Image src={pokemon.image} alt={pokemon.name} width={64} height={64} />
              <p className="text-sm">{pokemon.name}</p>
            </div>
            {index < evolutionChain.length - 1 && (
              <div className="flex flex-col items-center">
                <ChevronRight className="w-6 h-6" />
                <span className="text-sm">Lv.{evolutionChain[index + 1].level}</span>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
