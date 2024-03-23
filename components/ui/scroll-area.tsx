'use client';

import { ScrollAreaScrollbar, Root, Viewport, Corner, ScrollAreaThumb } from '@radix-ui/react-scroll-area';
import React, { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import { cn } from '@/lib/utils';

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaScrollbar> & {
    thumbClassName?: string;
  }
>(({ className, thumbClassName, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-px',
      className
    )}
    {...props}
  >
    <ScrollAreaThumb
      className={cn('relative flex-1 rounded-full border border-primary/75 bg-primary/75', thumbClassName)}
    />
  </ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

const ScrollArea = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & {
    scrollbarClassName?: string;
    thumbClassName?: string;
  }
>(({ className, scrollbarClassName, thumbClassName, children, ...props }, ref) => (
  <Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
    <Viewport className="size-full rounded-[inherit]">{children}</Viewport>
    <ScrollBar className={scrollbarClassName} thumbClassName={thumbClassName} />
    <Corner />
  </Root>
));
ScrollArea.displayName = Root.displayName;

export { ScrollArea, ScrollBar };
