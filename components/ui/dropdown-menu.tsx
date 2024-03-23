'use client';

import { Listbox, Transition } from '@headlessui/react';
import type { ClassValue } from 'clsx';
import { Check } from 'lucide-react';
import React, { Fragment, forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react';

import { DropdownIcon } from '@/components/icons';
import { Button, buttonSizeClassNames } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface DropdownOption<T> {
  readonly label: ReactNode;
  readonly value: T;
}

const DropdownMenu = forwardRef<
  ElementRef<typeof Listbox>,
  ComponentPropsWithoutRef<typeof Listbox> & {
    children: ReactNode;
    className?: ClassValue;
  }
>(({ className, children, ...props }, ref) => (
  <Listbox ref={ref} {...props}>
    <div className={cn('relative', className)}>{children}</div>
  </Listbox>
));
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button> & {
    truncate?: boolean;
  }
>(({ className, truncate = false, children, ...props }, ref) => (
  <Listbox.Button
    ref={ref}
    as={Button}
    className={cn('w-full justify-between truncate ui-open:shadow-inner ui-open:ring-3', className)}
    {...props}
  >
    <span
      className={cn(
        'w-full items-center text-left',
        truncate ? 'inline-block truncate' : 'flex overflow-hidden whitespace-nowrap'
      )}
    >
      {children}
    </span>
    <DropdownIcon className="size-7" />
  </Listbox.Button>
));
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = forwardRef<
  ElementRef<typeof Listbox.Options>,
  ComponentPropsWithoutRef<typeof Listbox.Options> & {
    scrollable?: boolean;
  }
>(({ className, scrollable = false, ...props }, ref) => {
  const Comp = scrollable ? ScrollArea : 'ul';

  return (
    <Transition
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Listbox.Options
        ref={ref}
        as={Comp}
        className={cn(
          'z-50 flex w-full flex-col gap-0.5 overflow-hidden rounded-3xl bg-secondary p-[0.3125rem] text-secondary-foreground shadow-xl ring-1 ring-black/20 focus:outline-none',
          scrollable ? '!absolute max-h-60 pr-3 sm:max-h-80' : 'absolute',
          className
        )}
        {...props}
      />
    </Transition>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = forwardRef<
  ElementRef<typeof Listbox.Option>,
  Omit<ComponentPropsWithoutRef<typeof Listbox.Option>, 'children'> & {
    innerClassName?: string;
    checkClassName?: string;
    children?: ReactNode;
    size?: keyof typeof buttonSizeClassNames;
  }
>(({ value, className, innerClassName, checkClassName, children, size = 'default', ...props }, ref) => (
  <Listbox.Option
    ref={ref}
    value={value}
    className={cn(
      'flex select-none outline-none',
      buttonSizeClassNames[size],
      'p-0', // reset buttonSizeClassNames padding
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'relative flex size-full items-center justify-between rounded-full px-3 transition-colors duration-75',
        'ui-active:bg-secondary-hover ui-active:active:bg-primary ui-active:active:text-primary-foreground',
        innerClassName
      )}
    >
      {children}
      <Check
        className={cn('hidden size-6 ui-selected:flex', size === 'small' && 'size-5', checkClassName)}
        strokeWidth={4}
      />
    </div>
  </Listbox.Option>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger };
