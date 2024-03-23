import { DropdownIcon } from '@/components/icons';
import { SectionRow } from '@/components/sections/section-row';
import { StatsTable } from '@/components/stats-table';
import { Button } from '@/components/ui/button';
import { CollapsibleContent, CollapsibleTrigger, CollapsibleWithState } from '@/components/ui/collapsible';
import { Section, SectionContent, SectionHeader } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import type { Active } from '@/data/types';

interface ActiveTalentAttributesProps {
  talent: Active;
}

const ActiveTalentAttributes = ({ talent }: ActiveTalentAttributesProps) => {
  const numCols = talent.attributes[0]!.params.length;

  return (
    <CollapsibleWithState className="group mt-4">
      <CollapsibleTrigger asChild>
        <Button variant="secondary">
          {talent.category} Stats
          <DropdownIcon className="ml-1.5 size-6 min-w-6 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <StatsTable
          data={talent.attributes}
          topHeadings={Array.from(Array(numCols).keys()).map((lvl) => `Lv.${lvl + 1}`)}
        />
      </CollapsibleContent>
    </CollapsibleWithState>
  );
};

interface ActiveTalentSectionProps {
  actives: Active[];
}

export const ActiveTalentSection = ({ actives }: ActiveTalentSectionProps) => (
  <Section className="overflow-hidden">
    <SectionHeader>Active Talents</SectionHeader>
    <Separator className="my-4" invert />
    <SectionContent>
      {actives.map((activeTalent) => (
        <SectionRow talent={activeTalent} key={activeTalent.name}>
          <ActiveTalentAttributes talent={activeTalent} />
        </SectionRow>
      ))}
    </SectionContent>
  </Section>
);
