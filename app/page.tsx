import { CharacterList } from '@/components/character-list';
import { FilterHub } from '@/components/filters/filter-hub';

const Home = () => (
  <main className="container flex flex-col gap-6">
    <FilterHub />
    <CharacterList />
  </main>
);

export default Home;
