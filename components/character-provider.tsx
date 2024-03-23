import { Provider as JotaiProvider } from 'jotai';

import { HydrateCharacterAtoms } from '@/components/hydrate-characters';
import { getAllCharacters } from '@/data/retrieve';

interface CharacterProviderProps extends React.ComponentProps<typeof JotaiProvider> {}

export const CharacterProvider = ({ children, ...props }: CharacterProviderProps) => {
  const characters = getAllCharacters();

  return (
    <JotaiProvider {...props}>
      <HydrateCharacterAtoms characters={characters}>{children}</HydrateCharacterAtoms>
    </JotaiProvider>
  );
};
