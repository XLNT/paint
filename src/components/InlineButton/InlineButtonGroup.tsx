import React, { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';

export function InlineButtonGroup({ children, className }: PropsWithChildren<{}> & WithClassName) {
  return (
    <div
      className={cn(className, 'flex flex-row', 'border-t border-smudge', 'divide-x divide-smudge')}
    >
      {children}
    </div>
  );
}
