// 한글 타입 매핑
export const koreanTypes = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
};

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  gif: string;
  stats?: {
    name: string;
    value: number;
  }[];

  evolutionChain?: {
    id: string;
    name: string;
    image: string;
    level: number;
  }[];
}
