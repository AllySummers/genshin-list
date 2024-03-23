'use client';

import { ReverseIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useSetIsReversed } from '@/hooks/use-characters';

interface ReverseBtnProps {
  className?: string;
}

export const ReverseBtn = ({ className }: ReverseBtnProps) => {
  const setIsReversed = useSetIsReversed();
  return (
    <Button onClick={() => setIsReversed((prev) => !prev)} aria-label="Reverse" className={className} size="icon">
      <ReverseIcon className="size-7" />
      <span className="sr-only">Reverse</span>
    </Button>
  );
};
