import { getCharacterNames } from "@/backend/shared";
import { MainCharacterFilterList } from "@/components/main-character-filter-list";
import * as genshindb from "genshin-db";

export default async function Home() {
  const { allCharacters, regions } = await getAllCharacters();

  return (
    <main className="container flex flex-col gap-6">
      <MainCharacterFilterList
        allCharacters={allCharacters}
        regions={regions}
      />
    </main>
  );
}

export const getAllCharacters = async () => {
  const characters = getCharacterNames();

  const characterProps: CharacterFilterInfo[] = characters.map((character) => {
    const characterInfo = genshindb.characters(character)!;
    return {
      name: characterInfo.name,
      nameicon: characterInfo.images.nameicon,
      element: characterInfo.element,
      weapontype: characterInfo.weapontype,
      region: characterInfo.region,
      rarity: characterInfo.rarity,
      version: characterInfo.version,
    };
  });

  const allRegions: Nation[] = [
    "Mondstadt",
    "Liyue",
    "Inazuma",
    "Sumeru",
    "Fontaine",
    "Natlan",
    "Snezhnaya",
    "Khaenri'ah",
  ];
  const foundRegions = new Set<Nation>();
  characterProps.forEach((character) => {
    foundRegions.add(character.region as Nation);
  });

  const regionProps: Nation[] = allRegions.filter((region) =>
    foundRegions.has(region),
  );

  return {
    allCharacters: characterProps
      .sort((a, b) => b.name.localeCompare(a.name))
      .sort((a, b) => b.rarity.localeCompare(a.rarity)),
    regions: regionProps,
  };
};