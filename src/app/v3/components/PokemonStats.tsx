import { Progress } from "@/components/ui/progress";

interface Stats {
  name: string;
  value: number;
}

interface PokemonStatsProps {
  stats: Stats[];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg">스탯</h3>
      {stats.map((stat) => (
        <div key={stat.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{stat.name}</span>
            <span>{stat.value}</span>
          </div>
          <Progress value={stat.value} max={255}></Progress>
        </div>
      ))}
    </div>
  );
}
