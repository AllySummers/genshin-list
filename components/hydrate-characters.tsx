'use client';

import { useHydrateAtoms } from 'jotai/utils';

import type { ReactNode } from 'react';
import type { CharacterFilter } from '@/data/types';
import { charactersAtom } from '@/hooks/use-characters';

interface HydrateAtomsProps {
  characters: CharacterFilter[];
  children: ReactNode;
}

export function HydrateCharacterAtoms({ characters, children }: HydrateAtomsProps) {
  useHydrateAtoms([[charactersAtom, characters]]);
  return children;
}
