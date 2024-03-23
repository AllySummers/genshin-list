import { SectionRow } from '@/components/sections/section-row';
import { Section, SectionContent, SectionHeader } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import type { Constellation } from '@/data/types';

interface ConstellationSectionProps {
  constellations: Constellation[];
}

export const ConstellationSection = ({ constellations }: ConstellationSectionProps) => (
  <Section>
    <SectionHeader>Constellations</SectionHeader>
    <Separator className="my-4" invert />
    <SectionContent>
      {constellations.map((constellation, index) => (
        <SectionRow
          talent={constellation}
          key={`${index}-${constellation.name}`} // Aloy has same constellation name for each constellation
        />
      ))}
    </SectionContent>
  </Section>
);
