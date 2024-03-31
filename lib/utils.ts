import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const myRound = (num: number, precision: number) => {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};

export const formatNameUrl = (name: string) => name.toLowerCase().replace(/\s/g, '-');

export const unformatNameUrl = (nameUrl: string) => nameUrl.replace(/-/g, ' ');

export const formatCloudinaryUrl = (url: string) =>
  `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;

export const formatAmbrUrl = (url: string) => `https://api.ambr.top/assets/UI/${url}.png`;

export const formatImageUrl = (url: string) =>
  // control where all images are retrieved from
  // do not retrieve images from "mihoyo.com" (it sends cookies)
  formatAmbrUrl(url);

export const formatLocalImageUrl = (dir: '/' | '/elements' | '/weapons', imageFile: string) =>
  `/images${dir}/${imageFile.toLowerCase()}.png`;

export const formatLongNumber = (value: bigint | number) =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
  }).format(value);

export const sortString = (a: string, b: string) => a.localeCompare(b);

export const sortNumber = (a: number, b: number) => a - b;

export const sortStringAsNumber = (a: string, b: string) =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });

export const isEqualSets = (a: Set<unknown>, b: Set<unknown>) => {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  return Array.from(a).every((x) => b.has(x));
};

export const pick = <T extends object, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]])) as Pick<T, K>;
