import React, { HTMLAttributes } from 'react';
import { Text, SubText } from '../Text/Text';
import { cn } from '../../utils/cn';

export interface SectionInterface {
  id: string;
  name: string;
  color: string;
}

export const DefaultSection: SectionInterface = {
  id: 'default',
  name: 'Uncategorized',
  color: '#E8E9F1', // smudge
};

export function Section({
  section,
  sub = false,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  section: Pick<SectionInterface, 'name' | 'color'>;
  sub?: boolean;
}) {
  const _section = section ?? DefaultSection; // handle null case from db
  const TextComponent = sub ? SubText : Text;
  return (
    <div className={cn(className, 'flex flex-row items-center')} {...rest}>
      <div
        className={cn('h-2 w-2 bg-smudge rounded-full', sub ? 'mr-1' : 'mr-2')}
        style={{ backgroundColor: _section.color }}
      />
      <TextComponent>{_section.name}</TextComponent>
    </div>
  );
}
