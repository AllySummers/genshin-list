import { SectionRow } from '@/components/sections/section-row';
import { Section, SectionContent, SectionHeader } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import type { Passive } from '@/data/types';

interface PassiveTalentSectionProps {
  passives: Passive[];
}

export const PassiveTalentSection = ({ passives }: PassiveTalentSectionProps) => (
  <Section>
    <SectionHeader>Passive Talents</SectionHeader>
    <Separator className="my-4" invert />
    <SectionContent>
      {passives.map((passiveTalent) => (
        <SectionRow talent={passiveTalent} key={passiveTalent.name} />
      ))}
    </SectionContent>
  </Section>
);
