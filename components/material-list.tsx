'use client';

import { ItemCard } from '@/components/card-templates';
import { useCalculatedMaterials, useMaterialNameToInfo } from '@/hooks/use-materials';
import { formatImageUrl } from '@/lib/utils';

interface MaterialListProps {}

export const MaterialList = ({}: MaterialListProps) => {
  const calculatedMaterials = useCalculatedMaterials();
  const materialNameToInfo = useMaterialNameToInfo();

  return (
    // NOTE: might remove mora card and replace it with "Required (mora icon) [Amount]" center below cards
    <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
      {calculatedMaterials.map(([material, count]) => (
        <div className="w-[5.25rem] lg:w-24" title={material} key={`${material}`}>
          <ItemCard
            label={count}
            quality={100}
            src={formatImageUrl(materialNameToInfo[material]!.icon)}
            alt={material}
            size={104} // NOTE: make equal to lg:w-[??px] on max system font size
          />
        </div>
      ))}
      {calculatedMaterials.length === 0 && (
        <div className="min-w-max rounded bg-gradient-to-b from-[#323947] to-[#4a5366] p-4 text-white">
          No Materials
        </div>
      )}
    </div>
  );
};
