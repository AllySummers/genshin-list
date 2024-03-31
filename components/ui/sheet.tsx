'use client';

import { Close, Content, Description, Overlay, Portal as SheetPortal, Title } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from 'react';

import { GenshinCloseIcon } from '@/components/icons';
import type { buttonVariants } from '@/components/ui/button';
import { CircleButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SheetOverlay = Object.assign(
  forwardRef<ElementRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(({ className, ...props }, ref) => (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-background/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
      ref={ref}
    />
  )),
  { displayName: Overlay.displayName }
);

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
        leftBottom: cn(
          'md:inset-y-0 md:left-0 md:h-full md:max-w-2xl md:border-r md:data-[state=closed]:slide-out-to-left md:data-[state=open]:slide-in-from-left', // left
          'inset-x-0 bottom-0 h-5/6 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom', // bottom
          'md:border-t-0 md:data-[state=closed]:slide-out-to-bottom-[0%] md:data-[state=open]:slide-in-from-bottom-[0%]' // reset bottom styles
        )
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
);

interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof sheetVariants>,
    VariantProps<typeof buttonVariants> {
  closeClassName?: string;
}

export const SheetContent = Object.assign(
  forwardRef<ElementRef<typeof Content>, SheetContentProps>(
    ({ side = 'right', className, closeClassName, children, variant, ...props }, ref) => (
      <SheetPortal>
        <SheetOverlay />
        <Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
          {children}
          <Close asChild className={cn('absolute right-4 top-4', closeClassName)}>
            <CircleButton variant={variant}>
              <GenshinCloseIcon className="size-9" />
              <span className="sr-only">Close</span>
            </CircleButton>
          </Close>
        </Content>
      </SheetPortal>
    )
  ),
  { displayName: Content.displayName }
);

export const SheetHeader = Object.assign(
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col text-center sm:text-left', className)} {...props} />
  ),
  { displayName: 'SheetHeader' }
);

export const SheetFooter = Object.assign(
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
  ),
  { displayName: 'SheetFooter' }
);

export const SheetTitle = Object.assign(
  forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(({ className, ...props }, ref) => (
    <Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
  )),
  { displayName: Title.displayName }
);

export const SheetDescription = Object.assign(
  forwardRef<ElementRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(
    ({ className, ...props }, ref) => (
      <Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    )
  ),
  { displayName: Description.displayName }
);
SheetDescription.displayName = Description.displayName;

export {
  Root as Sheet,
  Trigger as SheetTrigger,
  Close as SheetClose,
  Portal as SheetPortal
} from '@radix-ui/react-dialog';
