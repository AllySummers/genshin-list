'use client';

import {
  Root,
  CollapsibleTrigger as CollapsiblePrimitive_CollapsibleTrigger,
  CollapsibleContent as CollapsiblePrimitive_CollapsibleContent
} from '@radix-ui/react-collapsible';
import * as React from 'react';

const Collapsible = Root;

const CollapsibleTrigger = CollapsiblePrimitive_CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive_CollapsibleContent;

const CollapsibleWithState = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  Omit<React.ComponentPropsWithoutRef<typeof Collapsible>, 'onOpenChange' | 'open'>
>(({ className, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return <Collapsible open={open} onOpenChange={setOpen} className={className} ref={ref} {...props} />;
});
CollapsibleWithState.displayName = 'CollapsibleWithState';

export { Collapsible, CollapsibleContent, CollapsibleTrigger, CollapsibleWithState };
