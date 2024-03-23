import React from 'react';

import { cn } from '@/lib/utils';

const Section = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <section
    className={cn(
      'flex flex-col bg-section p-4 text-section-foreground sm:rounded-lg sm:border sm:p-5 sm:shadow',
      className
    )}
    {...props}
  />
);

const SectionHeader = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-2xl', className)} {...props} />
);

const SectionContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-4', className)} {...props} />
);

export { Section, SectionHeader, SectionContent };
