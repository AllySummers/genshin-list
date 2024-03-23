import { Provider as JotaiProvider } from 'jotai';

import type { ComponentProps } from 'react';
import { HydrateCharacterAtoms } from '@/components/hydrate-characters';
import { getAllCharacters } from '@/data/retrieve';

interface CharacterProviderProps extends ComponentProps<typeof JotaiProvider> {}

export const CharacterProvider = ({ children, ...props }: CharacterProviderProps) => {
  const characters = getAllCharacters();

  return (
    <JotaiProvider {...props}>
      <HydrateCharacterAtoms characters={characters}>{children}</HydrateCharacterAtoms>
    </JotaiProvider>
  );
};
