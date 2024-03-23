import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import type { Active } from '@/data/types';
import { cn } from '@/lib/utils';

const headColorClassName = 'bg-muted dark:bg-background';

interface FirstColumnHeadProps {
  className?: string;
  paddingClassName?: string;
  children: ReactNode;
}

const FirstColumnHead = ({ className, paddingClassName, children }: FirstColumnHeadProps) => (
  <TableHead scope="row" className={cn('sticky left-0 w-36 p-0 sm:w-40', headColorClassName, className)}>
    <div className={cn('w-36 sm:w-40', paddingClassName)}>{children}</div>
  </TableHead>
);

interface StatsTableProps {
  data: Active['attributes'];
  topHeadings: ReactNode[];
}

export const StatsTable = ({ data, topHeadings }: StatsTableProps) => (
  // NOTE: make sure -mx-[] is eqaul to p-[] in section
  <Table containerClassName="border-y sm:border sm:rounded-lg sm:mx-0 -mx-4 w-auto sm:w-full">
    <TableBody>
      <TableRow>
        <FirstColumnHead paddingClassName="px-4">Level</FirstColumnHead>
        {topHeadings.map((heading, i) => (
          <TableHead key={i} className={cn('border-l', headColorClassName)}>
            <span className="flex flex-nowrap items-center whitespace-nowrap">{heading}</span>
          </TableHead>
        ))}
      </TableRow>

      {data.map(({ label, params }) => (
        <TableRow key={label}>
          <FirstColumnHead paddingClassName="p-4">{label}</FirstColumnHead>
          {params.map((param, i) => (
            <TableCell key={i} className="min-w-28 border-l">
              {param}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
