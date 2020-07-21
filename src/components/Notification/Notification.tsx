import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Notification({
  className,
  children,
  accessory,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { accessory?: ReactNode }) {
  return (
    <div
      className={cn(
        className,
        'bg-smudge',
        'flex flex-row items-center justify-between',
        'min-w-0 min-h-0',
        'p-2 space-x-2',
      )}
      {...rest}
    >
      {children}
      {accessory}
    </div>
  );
}
