import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { getInitialFilterAttributes } from "@/data/constants";
import type {
  CharacterFilter,
  CharacterSortKeys,
  FilterAttributes,
} from "@/data/types";
import { sortString, sortStringAsNumber } from "@/lib/utils";

const sortFunctions: Record<
  CharacterSortKeys,
  (a: string, b: string) => number
> = {
  name: sortString,
  weapon: sortString,
  element: sortString,
  region: sortString,
  rarity: sortStringAsNumber,
  version: sortStringAsNumber,
} as const;

const searchQueryAtom = atom("");
const sortOptionAtom = atom<CharacterSortKeys>("version");
const isReversedAtom = atom(true);
const attrFilterAtom = atom<FilterAttributes>(getInitialFilterAttributes());
export const charactersAtom = atom<CharacterFilter[]>([]); // hydrate
const filteredCharactersAtom = atom((get) => {
  const characters = get(charactersAtom);
  const attrFilter = get(attrFilterAtom);
  const isReversed = get(isReversedAtom);
  const sortKey = get(sortOptionAtom);
  const lcFilter = get(searchQueryAtom).toLowerCase(); // case insensitive
  const sortFunction = sortFunctions[sortKey];

  return characters
    .filter(
      (character) =>
        character.name.toLowerCase().includes(lcFilter) &&
        Object.entries(attrFilter).every(([key, filterSet]) => {
          if (filterSet.size === 0) {
            return true;
          }

          const characterValue = character[key as keyof CharacterFilter];
          return (filterSet as Set<unknown>).has(characterValue);
        }),
    )
    .sort(
      isReversed
        ? (b, a) => sortFunction(a[sortKey], b[sortKey])
        : (a, b) => sortFunction(a[sortKey], b[sortKey]),
    );
});

export function useSearchQuery() {
  return useAtom(searchQueryAtom);
}

export function useSortOption() {
  return useAtom(sortOptionAtom);
}

export function useIsReversed() {
  return useAtom(isReversedAtom);
}

export function useSetIsReversed() {
  return useSetAtom(isReversedAtom);
}

export function useAttrFilter() {
  return useAtom(attrFilterAtom);
}

export function useCharacters() {
  return useAtom(charactersAtom);
}

export function useFilteredCharacters() {
  return useAtomValue(filteredCharactersAtom);
}
