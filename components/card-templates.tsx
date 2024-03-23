import Link from 'next/link';

import { Card, CardImage, CardLabel } from '@/components/ui/card';
import { IconImage } from '@/components/ui/icon-image';
import type { CharacterFilter } from '@/data/types';
import { formatImageUrl, formatLocalImageUrl, formatLongNumber, formatNameUrl } from '@/lib/utils';

interface CharacterCardProps {
  character: CharacterFilter;
  size: number;
}

export const CharacterCard = ({ character, size }: CharacterCardProps) => (
  <Card hover="default" asChild>
    <Link href={formatNameUrl(character.name)}>
      <CardImage
        src={formatImageUrl(character.icon)}
        alt=""
        gradient={character.rarity === '5' ? 'gold' : 'purple'}
        width={size}
        height={size}
      >
        <div className="absolute left-0.5 top-0.5">
          <IconImage
            src={formatLocalImageUrl('/elements', character.element)}
            alt={character.element}
            className="size-[1.875rem]"
          />
        </div>
      </CardImage>
      <CardLabel title={character.name}>{character.name}</CardLabel>
    </Link>
  </Card>
);

interface ItemCardProps {
  label: number | string;
  src: string;
  alt: string;
  size: number;
  unoptimized?: boolean;
  shortenLongNumber?: boolean; // format long numbers => 7,050,900 => 7.05M
}

export const ItemCard = ({ label, src, alt, size, unoptimized = true, shortenLongNumber = true }: ItemCardProps) => {
  const formattedLabel = shortenLongNumber && typeof label === 'number' ? formatLongNumber(label) : label;

  return (
    <Card>
      <CardImage
        src={src}
        alt={alt}
        gradient="default"
        width={size}
        height={size}
        unoptimized={unoptimized} // https://vercel.com/docs/image-optimization/limits-and-pricing
      />
      <CardLabel>{formattedLabel}</CardLabel>
    </Card>
  );
};
