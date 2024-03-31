export type SiteConfig = typeof siteConfig;

const BASE_URL = 'https://characters.genshin.pw';

export const siteConfig = {
  name: 'Genshin List',
  url: BASE_URL,
  ogImage: `${BASE_URL}/og.jpg`,
  description:
    'Find and filter characters from Genshin Impact. Calculate required materials to level up any character.',
  links: {
    github: 'https://github.com/AllySummers/genshin-list'
  }
};
