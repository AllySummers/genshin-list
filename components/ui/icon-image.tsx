import Image from 'next/image';

import { cn } from '@/lib/utils';

interface IconImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  invert?: boolean;
}

export const IconImage = ({ src, alt, className, imageClassName, invert = false }: IconImageProps) => (
  <div className={cn('relative block', className)}>
    <Image
      alt={alt}
      src={src}
      fill
      unoptimized // https://vercel.com/docs/image-optimization/limits-and-pricing
      className={cn(invert && 'invert dark:filter-none', imageClassName)}
    />
  </div>
);
