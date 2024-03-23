'use client';

import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type DropdownOption
} from '@/components/ui/dropdown-menu';
import type { CharacterSortKeys } from '@/data/types';
import { useSortOption } from '@/hooks/use-characters';

export const sortOptions: Array<DropdownOption<CharacterSortKeys>> = [
  { label: 'Version', value: 'version' },
  { label: 'Element', value: 'element' },
  { label: 'Weapon', value: 'weapon' },
  { label: 'Region', value: 'region' },
  { label: 'Rarity', value: 'rarity' }, // NOTE: might label Quality
  { label: 'Name', value: 'name' }
] as const;

interface SortDropdownProps {
  className?: string;
}

export const SortDropdown = ({ className }: SortDropdownProps) => {
  const [sortOption, setSortOption] = useSortOption();

  return (
    <DropdownMenu value={sortOption} onChange={setSortOption} className={className}>
      <DropdownMenuTrigger truncate>Sort by {sortOption.label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem key={option.value} value={option}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
