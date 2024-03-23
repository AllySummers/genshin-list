'use client';

import {
  Root,
  CollapsibleTrigger as CollapsiblePrimitive_CollapsibleTrigger,
  CollapsibleContent as CollapsiblePrimitive_CollapsibleContent
} from '@radix-ui/react-collapsible';
import React, { forwardRef, useState, type ComponentPropsWithoutRef, type ElementRef } from 'react';

const Collapsible = Root;

const CollapsibleTrigger = CollapsiblePrimitive_CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive_CollapsibleContent;

const CollapsibleWithState = forwardRef<
  ElementRef<typeof Collapsible>,
  Omit<ComponentPropsWithoutRef<typeof Collapsible>, 'onOpenChange' | 'open'>
>(({ className, ...props }, ref) => {
  const [open, setOpen] = useState(false);

  return <Collapsible open={open} onOpenChange={setOpen} className={className} ref={ref} {...props} />;
});
CollapsibleWithState.displayName = 'CollapsibleWithState';

export { Collapsible, CollapsibleContent, CollapsibleTrigger, CollapsibleWithState };
