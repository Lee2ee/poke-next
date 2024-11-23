import { koreanTypes, Pokemon } from "@/types/pokemon";

const statNames: Record<string, string> = {
  hp: "체력",
  attack: "공격력",
  defense: "방어력",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

export const pokemonApi = {
  // 포켓몬 리스트 가져오기
  async fetchPokemonList(offset: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    return response.json();
  },

  // 포켓몬 상세정보 가져오기
  async fetchPokemonDetail(url: string) {
    const res = await fetch(url);
    return res.json();
  },

  // 포켓몬 속성 가져오기
  async fetchPokemonSpecies(url: string) {
    const res = await fetch(url);
    return res.json();
  },

  // 포켓몬 요청
  async fetchPokemonWithDetails(offset: number) {
    try {
      const data = await this.fetchPokemonList(offset);

      const results = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          // 1. 필요한 데이터 url에서 가져오기
          const pokemonData = await this.fetchPokemonDetail(pokemon.url);
          const speciesData = await this.fetchPokemonSpecies(pokemonData.species.url);
          const evolutionData = await this.fetchPokemonDetail(speciesData.evolution_chain.url);

          // 2. 한글 이름 찾기
          const koreanName =
            speciesData.names.find((name: { language: { name: string } }) => name.language.name === "ko")?.name ||
            pokemonData.name;

          // 3. 포켓몬 능력치 찾기
          const stats = pokemonData.stats.map((stat: any) => ({
            name: statNames[stat.stat.name] || stat.stat.name,
            value: stat.base_stat,
          }));

          // 4. 진화 트리
          const evolutionChain = await this.processEvolutionchain(evolutionData.chain);

          return {
            id: pokemonData.id,
            name: koreanName,
            types: pokemonData.types.map(
              (t: { type: { name: string } }) => koreanTypes[t.type.name as keyof typeof koreanTypes] || t.type.name
            ),
            image: pokemonData.sprites.front_default,
            gif: pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default,
            stats,
            evolutionChain,
          };
        })
      );
      return results;
    } catch (error) {
      return [];
    }
  },
  async processEvolutionchain(chain: any): Promise<Array<{ id: number; name: string; image: string; level: number }>> {
    const results = [];
    let current = chain;

    while (current) {
      if (current.species) {
        const pokemonData = await this.fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);
        const speciesData = await this.fetchPokemonSpecies(current.species.url);

        const koreanName =
          speciesData.names.find((name: { language: { name: string } }) => name.language.name === "ko")?.name ||
          current.species.name;

        results.push({
          id: pokemonData.id,
          name: koreanName,
          image: pokemonData.sprites.front_default,
          level: current.evolution_details?.[0]?.min_level || 1,
        });
      }
      current = current.evolves_to?.[0];
    }
    return results;
  },
};
