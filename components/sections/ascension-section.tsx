import { StatsTable } from '@/components/stats-table';
import { Section, SectionContent, SectionHeader } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import type { Character } from '@/data/types';

interface AscensionSectionProps {
  stats: Character['stats'];
}

export const AscensionSection = ({ stats }: AscensionSectionProps) => (
  <Section className="overflow-hidden">
    <SectionHeader>Ascensions</SectionHeader>
    <Separator className="my-4" invert />
    <SectionContent>
      <StatsTable data={stats.data} topHeadings={stats.headings} />
    </SectionContent>
  </Section>
);
