import { Provider as JotaiProvider } from 'jotai';

import { getCharacterMaterialInfo } from '@/backend/requests';
import { HydrateMaterialAtoms } from '@/components/hydrate-materials';
import { formatAscension } from '@/components/icons';
import type { MaterialCount } from '@/data/types';
import { sortStringAsNumber } from '@/lib/utils';

interface MaterialProviderProps extends React.ComponentProps<typeof JotaiProvider> {
  name: string;
}

export const MaterialProvider = ({ name, children, ...props }: MaterialProviderProps) => {
  const materials = getCharacterMaterialInfo(name);
  const [levelOptions, levelMats] = getOptionsMats(materials.costs.levels);
  const [talentOptions, talentMats] = getOptionsMats(materials.costs.talents);

  return (
    <JotaiProvider {...props}>
      <HydrateMaterialAtoms
        materials={materials}
        levelOptions={levelOptions}
        levelMats={levelMats}
        talentOptions={talentOptions}
        talentMats={talentMats}
      >
        {children}
      </HydrateMaterialAtoms>
    </JotaiProvider>
  );
};

function getOptionsMats(materialCosts: MaterialCount) {
  const keys = Object.keys(materialCosts).sort((a, b) => sortStringAsNumber(a, b));

  const options = keys.map((key, idx) => {
    if (key.endsWith('+')) {
      const strippedKey = key.slice(0, -1);
      return {
        label: formatAscension(strippedKey),
        value: idx
      } as const;
    }
    return { label: key, value: idx } as const;
  });

  const materials = keys.map((key) => materialCosts[key]!);
  return [options, materials] as const;
}
