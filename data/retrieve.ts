import {
  getCharacterFilterInfo,
  getCharacterInfo,
  getCharacterNames,
  getConstellationInfo,
  getTalentInfo
} from '@/backend/requests';
import { sortString, sortStringAsNumber } from '@/lib/utils';

export const getNamePageProps = (name: string) => ({
  character: getCharacterInfo(name),
  talents: getTalentInfo(name),
  constellations: getConstellationInfo(name)
});

export const getAllCharacters = () =>
  getCharacterNames()
    .map((name) => getCharacterFilterInfo(name))
    .sort((a, b) => sortString(a.name, b.name))
    .sort((a, b) => sortString(b.element, a.element))
    .sort((a, b) => sortStringAsNumber(b.version, a.version))
    .sort((a, b) => sortStringAsNumber(b.rarity, a.rarity));
