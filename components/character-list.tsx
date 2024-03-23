'use client';

import { CharacterCard } from '@/components/card-templates';
import { useFilteredCharacters } from '@/hooks/use-characters';

interface CharacterListProps {}

export const CharacterList = ({}: CharacterListProps) => {
  const filteredCharacters = useFilteredCharacters();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_6.15625rem)] justify-center gap-4 sm:grid-cols-[repeat(auto-fill,_8.25rem)] sm:gap-5 lg:gap-6">
      {filteredCharacters.map((character) => (
        <CharacterCard key={character.name} character={character} size={132} />
      ))}
    </div>
  );
};
