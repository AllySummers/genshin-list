import { string, number } from 'zod';

import { formatMarkdown } from '@/backend/markdown';
import { getCharacterWeekdays } from '@/backend/requests';
import type {
  CharacterDB,
  CombatAttribute,
  ConstellationDB,
  MaterialDB,
  StatFunction,
  TalentDB
} from '@/backend/schema';
import { formatAscension } from '@/components/icons';
import { LEVELS } from '@/data/constants';
import type { ActiveCategory, Character } from '@/data/types';
import { myRound, pick } from '@/lib/utils';

const formatTalentParams = (param: string, parameters: CombatAttribute['parameters'], talentlevel: number) =>
  // replaces {paramNum:format} with formatted number
  param.replace(/{(?<paramNum>[^}]+):(?<format>[^}]+)}/g, (_match, ...args) => {
    const { paramNum, format } = args.at(-1) as {
      paramNum: string; // `param${number}`
      format: string; // "I" | "F1" | "F2" | "F1P" | "F2P" | "P"
    };

    if (paramNum in parameters) {
      const paramValues = parameters[paramNum]!; // zod ensures there is an associated number[]
      const value = number().parse(paramValues[talentlevel]);

      // FormatSchema ensures 1st index is a number if it includes an F
      const precision = format.startsWith('F') ? parseInt(format[1]!) : 0;

      if (format === 'I') {
        // integer
        return Math.round(value).toString();
      } else if (format.endsWith('P')) {
        // percent
        return `${myRound(value * 100, precision)}%`;
      } else if (format.startsWith('F')) {
        // float
        return myRound(value, precision).toString();
      } else {
        return value.toString();
      }
    } else {
      throw new Error(`genshindb includes invalid paramNum: ${paramNum}`);
    }
  });

const maxLvlMap = {
  'Normal Attack': 10, // max is 15
  'Elemental Skill': 13, // max is 15
  'Elemental Burst': 13, // max is 15
  'Alternate Sprint': 1
} as const;
const formatCombatAttributes = (attributes: CombatAttribute, category: ActiveCategory) =>
  attributes.labels.map((label) => {
    // ex: 1-Hit DMG|{param1:F1P}
    const [possibleHeading, possibleParams] = label.split('|');
    const heading = string().parse(possibleHeading);
    const params = string().parse(possibleParams);

    const maxLvl = Math.min(attributes.parameters.param1?.length ?? Infinity, maxLvlMap[category]);

    return {
      label: heading,
      params: Array.from(Array(maxLvl).keys()).map((i) => formatTalentParams(params, attributes.parameters, i))
    };
  });

// Get array of stats at all ascension levels and include lvl 1 and 90
const formatCharStats = (statsFunc: StatFunction, substat: string) => {
  // ascension levels at 20, 40, 50, 60, 70, 80
  const headings = LEVELS.map(([level, isAscended]) => {
    const levelHead = `Lv.${level}`;

    return isAscended === '+' ? formatAscension(levelHead) : levelHead;
  });

  const statResults = LEVELS.map(([level, isAscended]) => statsFunc(level, isAscended));

  const labelsKeyMap = [
    { label: 'Base HP', key: 'hp' },
    { label: 'Base ATK', key: 'attack' },
    { label: 'Base DEF', key: 'defense' },
    { label: substat, key: 'specialized' }
  ] as const;

  return {
    headings: headings,
    data: labelsKeyMap.map(({ label, key }) => ({
      label: label,
      params: statResults.map((result) => result[key])
    }))
  };
};

/**
 * Reformats genshin-db character info to expected format.
 */
export const formatCharacter = ({
  id,
  name,
  version,
  title,
  description,
  rarity,
  elementText,
  weaponText,
  substatText,
  region,
  constellation,
  cv,
  affiliation,
  birthdaymmdd,
  stats,
  images
}: CharacterDB) => ({
  id,
  name,
  version,
  title,
  description,
  rarity,
  element: elementText,
  weapon: weaponText,
  substat: substatText,
  region,
  affiliation,
  birthday: birthdaymmdd,
  constellation,
  weekdays: getCharacterWeekdays(name),
  va: cv,
  stats: formatCharStats(stats, substatText),
  gachaSplash: images.filename_gachaSplash,
  icon: images.filename_icon
});

export const formatCharacterFilter = (character: Character) =>
  pick(character, 'id', 'name', 'version', 'element', 'weapon', 'region', 'rarity', 'icon');

const formatActive = (category: ActiveCategory, active: TalentDB['combat1'], icon: string) => ({
  category: category,
  name: active.name,
  description: formatMarkdown(active.descriptionRaw), // descriptionRaw includes flavorText
  // flavorText: active.flavorText ?? "",
  attributes: formatCombatAttributes(active.attributes, category),
  icon: icon
});

export const formatActives = (talents: TalentDB) => [
  formatActive('Normal Attack', talents.combat1, talents.images.filename_combat1),
  formatActive('Elemental Skill', talents.combat2, talents.images.filename_combat2),
  formatActive('Elemental Burst', talents.combat3, talents.images.filename_combat3),
  // So far only Mona and Ayaka have an alternate sprint
  ...(talents.combatsp !== undefined
    ? // zod ensures image file will be there if associated combat exists
      [formatActive('Alternate Sprint', talents.combatsp, talents.images.filename_combatsp!)]
    : [])
];

const formatPassive = (passive: TalentDB['passive1'], icon: string) => ({
  name: passive.name,
  description: formatMarkdown(passive.descriptionRaw),
  icon: icon
});

export const formatPassives = (talents: TalentDB) => [
  formatPassive(talents.passive1, talents.images.filename_passive1),
  formatPassive(talents.passive2, talents.images.filename_passive2),
  formatPassive(talents.passive3, talents.images.filename_passive3),
  // So far only Kokomi has a fourth passive
  ...(talents.passive4 !== undefined
    ? [
        // zod ensures image file will be there if associated passive exists
        formatPassive(talents.passive4, talents.images.filename_passive4!)
      ]
    : [])
];

const formatConstellation = (constellation: ConstellationDB['c1'], icon: string) => ({
  name: constellation.name,
  description: formatMarkdown(constellation.descriptionRaw),
  icon: icon
});

export const formatConstellations = (constellations: ConstellationDB) => [
  formatConstellation(constellations.c1, constellations.images.filename_c1),
  formatConstellation(constellations.c2, constellations.images.filename_c2),
  formatConstellation(constellations.c3, constellations.images.filename_c3),
  formatConstellation(constellations.c4, constellations.images.filename_c4),
  formatConstellation(constellations.c5, constellations.images.filename_c5),
  formatConstellation(constellations.c6, constellations.images.filename_c6)
];

export const formatMaterial = (material: MaterialDB) => ({
  id: material.id,
  name: material.name,
  icon: material.images.filename_icon,
  sortorder: material.sortRank,
  rarity: material.rarity?.toString() ?? '1',
  ...(material.daysOfWeek !== undefined && {
    daysofweek: material.daysOfWeek
  })
});
