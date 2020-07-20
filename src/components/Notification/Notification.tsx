import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Notification({
  className,
  children,
  sub = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { sub?: boolean }) {
  return (
    <div
      className={cn(className, 'bg-smudge', 'flex flex-row items-center min-h-0', 'p-2')}
      {...rest}
    >
      <div className={cn('flex-1 flex flex-row text-center', sub ? 'text-subtext' : 'text-base')}>
        {children}
      </div>
    </div>
  );
}
