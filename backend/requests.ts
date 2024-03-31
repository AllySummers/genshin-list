import { string, object, number } from 'zod';

import { api } from '@/backend/api';
import {
  formatActives,
  formatCharacter,
  formatCharacterFilter,
  formatConstellations,
  formatMaterial,
  formatPassives
} from '@/backend/format';
import { CharacterDBSchema, ConstellationDBSchema, MaterialDBSchema, TalentDBSchema } from '@/backend/schema';
import { LEVEL_EXP_BOOKS_MORA, LEVELS, LVL_TO_ASCENSION } from '@/data/constants';
import type { MaterialCount, MaterialInfo } from '@/data/types';

export const getCharacterDBInfo = (name: string) =>
  api(
    {
      folder: 'characters',
      query: name
    },
    CharacterDBSchema
  );

const getTalentDBInfo = (name: string) => api({ folder: 'talents', query: name }, TalentDBSchema);

const getMaterialDataFromNames = (names: string[]) => {
  const materialDataMap: MaterialInfo = {};
  for (const name of names) {
    const material = api({ folder: 'materials', query: name }, MaterialDBSchema);

    materialDataMap[name] = formatMaterial(material);
  }

  return materialDataMap;
};

const getMaterialData = (costItem: MaterialCount) =>
  getMaterialDataFromNames(
    Object.values(costItem).reduce<string[]>((acc, items) => [...acc, ...items.map(({ name }) => name)], [])
  );

const getCharacterTalentMaterialInfo = (name: string) => {
  const talentDBInfo = getTalentDBInfo(name);

  // remove lvl from key => lvl2 => 2
  const talentCosts: MaterialCount = Object.fromEntries(
    Object.entries(talentDBInfo.costs).map(([key, items]) => [key.replace('lvl', ''), items])
  );

  return {
    talentCosts,
    talentMaterialData: {
      ...getMaterialData(talentDBInfo.costs)
    }
  };
};

const getLevelUpMaterials = () => {
  const xpBookNames = api(
    {
      folder: 'materials',
      query: 'EXP_FRUIT',
      data: { matchCategories: true }
    },
    string().array()
  );

  const xpBookMap = getMaterialDataFromNames([...xpBookNames, 'Mora']);

  const levelCosts: MaterialCount = Object.fromEntries(
    Object.entries(LEVEL_EXP_BOOKS_MORA).map(([lvl, info]) => [
      lvl,
      Object.entries(info).map(([name, count]) => {
        const charInfo = object({ name: string(), id: number() }).parse(xpBookMap[name]);
        return {
          ...charInfo,
          count
        };
      })
    ])
  );

  return { levelCosts, xpBookMap };
};

const getCharacterLvlAscensionMaterialInfo = (name: string) => {
  const characterDBInfo = getCharacterDBInfo(name);
  const { levelCosts, xpBookMap } = getLevelUpMaterials();

  const characterCosts: MaterialCount = Object.fromEntries(
    LEVELS.map(([lvl, isAscended]) => {
      if (isAscended === '+') {
        const key = `${lvl}+`;
        const value = characterDBInfo.costs[LVL_TO_ASCENSION[lvl]];
        return [key, value];
      } else {
        const key = lvl;
        const value = levelCosts[lvl] ?? [];
        return [key, value];
      }
    })
  );

  return {
    characterCosts,
    characterMaterialData: {
      ...getMaterialData(characterDBInfo.costs),
      ...xpBookMap
    }
  };
};

export const getCharacterNames = () => {
  const names = api(
    {
      folder: 'characters',
      query: 'names',
      data: { matchCategories: true }
    },
    string().array()
  );

  const charactersNotIncluded = new Set(['Aether', 'Lumine']);
  const filteredCharacterNames = names.filter((character) => !charactersNotIncluded.has(character));

  return filteredCharacterNames;
};

export const getCharacterInfo = (name: string) => formatCharacter(getCharacterDBInfo(name));

/**
 * Returns a character object containing only keys necessary for filtering and sorting character
 */
export const getCharacterFilterInfo = (name: string) => {
  const characterInfo = getCharacterInfo(name);
  return formatCharacterFilter(characterInfo);
};

export const getTalentInfo = (name: string) => {
  const talentDBInfo = getTalentDBInfo(name);
  return {
    actives: formatActives(talentDBInfo),
    passives: formatPassives(talentDBInfo)
  };
};

export const getConstellationInfo = (name: string) =>
  formatConstellations(
    api(
      {
        folder: 'constellations',
        query: name
      },
      ConstellationDBSchema
    )
  );

export const getCharacterWeekdays = (name: string) => {
  const { talentMaterialData } = getCharacterTalentMaterialInfo(name);

  for (const material of Object.values(talentMaterialData)) {
    if (material.daysofweek) {
      return material.daysofweek;
    }
  }

  return [];
};

export const getCharacterMaterialInfo = (name: string) => {
  const { characterCosts, characterMaterialData } = getCharacterLvlAscensionMaterialInfo(name);
  const { talentCosts, talentMaterialData } = getCharacterTalentMaterialInfo(name);

  return {
    costs: { levels: characterCosts, talents: talentCosts },
    nameToInfo: {
      ...characterMaterialData,
      ...talentMaterialData
    }
  };
};
