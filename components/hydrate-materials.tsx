'use client';

import { useHydrateAtoms } from 'jotai/utils';

import type { ReactNode } from 'react';
import type { Item } from '@/backend/schema';
import type { DropdownOption } from '@/components/ui/dropdown-menu';
import type { AllMaterialInfo } from '@/data/types';
import {
  attackMaxAtom,
  burstMaxAtom,
  levelMatsAtom,
  levelMaxAtom,
  levelOptionsAtom,
  materialNameToInfoAtom,
  skillMaxAtom,
  talentMatsAtom,
  talentOptionsAtom
} from '@/hooks/use-materials';

interface HydrateAtomsProps {
  materials: AllMaterialInfo;
  levelOptions: Array<DropdownOption<number>>;
  levelMats: Item[][];
  talentOptions: Array<DropdownOption<number>>;
  talentMats: Item[][];
  children: ReactNode;
}

export const HydrateMaterialAtoms = ({
  materials,
  levelOptions,
  levelMats,
  talentOptions,
  talentMats,
  children
}: HydrateAtomsProps) => {
  useHydrateAtoms([
    [materialNameToInfoAtom, materials.nameToInfo],
    [levelOptionsAtom, levelOptions],
    [levelMatsAtom, levelMats],
    [levelMaxAtom, levelOptions.length - 1],
    [talentOptionsAtom, talentOptions],
    [talentMatsAtom, talentMats],
    [attackMaxAtom, talentOptions.length - 1],
    [skillMaxAtom, talentOptions.length - 1],
    [burstMaxAtom, talentOptions.length - 1]
  ]);
  return children;
};
