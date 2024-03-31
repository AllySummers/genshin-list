import React, { type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const Section = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <section
    className={cn(
      'flex flex-col bg-section p-4 text-section-foreground sm:rounded-lg sm:border sm:p-5 sm:shadow',
      className
    )}
    {...props}
  />
);

export const SectionHeader = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-2xl', className)} {...props} />
);

export const SectionContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-4', className)} {...props} />
);
