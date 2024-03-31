import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import Image, { type ImageProps } from 'next/image';
import React, { type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import CardBG from '@/public/images/card-bg.png';

const cardVariants = cva(
  'relative overflow-hidden rounded-md bg-gradient-to-t from-card via-card shadow-md ring-1 ring-border',
  {
    variants: {
      hover: {
        default: 'ring-offset-ring-white outline-none transition hocus:ring-offset-3 motion-safe:hocus:scale-105'
      }
    }
  }
);

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export const Card = Object.assign(
  ({ className, hover, asChild = false, ...props }: CardProps) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp className={cn(cardVariants({ hover, className }))} {...props} />;
  },
  { displayName: 'Card' }
);

const cardImageVariants = cva(
  'relative flex items-center justify-center overflow-hidden rounded-br-[1.25rem] border-b border-transparent',
  {
    variants: {
      gradient: {
        default: 'bg-gradient-to-t from-[#4a5366] to-[#323947]', // item
        purple: 'bg-gradient-to-t from-[#9c75b7] to-[#5e5789]', // 4 star
        gold: 'bg-gradient-to-t from-[#b27330] to-[#945c2c]', // 5 star
        red: 'bg-gradient-to-t from-[#b4455a] to-[#9b3c56]' // collab
      }
    }
  }
);

type CardImageVariantProps = VariantProps<typeof cardImageVariants>;

interface CardImageProps
  extends Omit<ImageProps, 'alt' | 'height' | 'width'>,
    Required<Pick<ImageProps, 'alt' | 'height' | 'width'>>,
    Omit<CardImageVariantProps, 'gradient'>,
    Required<Pick<CardImageVariantProps, 'gradient'>> {
  imageClassName?: string;
  quality?: number;
}

export const CardImage = Object.assign(
  ({ className, imageClassName, alt, gradient, children, quality, ...props }: CardImageProps) => (
    <div className={cn(cardImageVariants({ gradient, className }))}>
      <Image quality={quality} alt="" src={CardBG} fill unoptimized className="pointer-events-none" />
      <Image quality={quality} className={cn(imageClassName)} alt={alt} {...props} />
      {children}
    </div>
  ),
  { displayName: 'CardImage' }
);

export const CardLabel = Object.assign(
  ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className="relative w-full px-2 py-0.5" {...props}>
      <span className={cn('relative block w-full truncate text-center capitalize text-card-foreground', className)}>
        {children}
      </span>
    </div>
  ),
  { displayName: 'CardLabel' }
);
