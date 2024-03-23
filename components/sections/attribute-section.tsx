import { Section, SectionContent, SectionHeader } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import type { Character } from '@/data/types';
import { cn } from '@/lib/utils';

interface AttrRowProps {
  title: string;
  info: string;
}

const AttrRow = ({ title, info }: AttrRowProps) => (
  <TableRow>
    <TableHead scope="row">{title}</TableHead>
    <TableCell className="text-right">{info}</TableCell>
  </TableRow>
);

interface AttributeSectionProps {
  character: Character;
  className?: string;
}

export const AttributeSection = ({ character, className }: AttributeSectionProps) => (
  <Section className={cn('overflow-hidden', className)}>
    <SectionHeader>Attributes</SectionHeader>
    <Separator className="my-4" invert />
    <SectionContent>
      <Table className="text-base">
        <TableBody>
          <AttrRow title="Birthday" info={character.birthday} />
          <AttrRow title="Constellation" info={character.constellation} />
          <AttrRow title="Title" info={character.title} />
          <AttrRow title="Region" info={character.region} />
          {/* <AttrRow title="Element" info={character.element} /> */}
          <AttrRow title="Affiliation" info={character.affiliation} />
          <AttrRow title="English VA" info={character.va.english} />
          <AttrRow title="Version" info={character.version} />
        </TableBody>
      </Table>
    </SectionContent>
  </Section>
);
