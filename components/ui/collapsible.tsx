'use client';

import { Root } from '@radix-ui/react-collapsible';
import React, { forwardRef, useState, type ComponentPropsWithoutRef, type ElementRef } from 'react';

export const CollapsibleWithState = Object.assign(
  forwardRef<ElementRef<typeof Root>, Omit<ComponentPropsWithoutRef<typeof Root>, 'onOpenChange' | 'open'>>(
    ({ className, ...props }, ref) => {
      const [open, setOpen] = useState(false);

      return <Root open={open} onOpenChange={setOpen} className={className} ref={ref} {...props} />;
    }
  ),
  { displayName: 'CollapsibleWithState' }
);

export { Root as Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
