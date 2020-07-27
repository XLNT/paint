import React, { PropsWithChildren, HTMLProps } from 'react';
import { cn } from '../../utils/cn';

function AspectRatio({
  aspectRatio,
  className,
  children,
  ...extra
}: PropsWithChildren<{ aspectRatio: number } & HTMLProps<HTMLDivElement>>) {
  const activate = !!aspectRatio;
  return (
    <div
      className={cn(className, activate ? 'relative h-0' : 'h-full w-full')}
      style={{
        paddingTop: activate ? `${(aspectRatio * 100).toFixed(2)}%` : undefined,
      }}
      {...extra}
    >
      <div className={cn(activate ? 'absolute-full' : 'h-full w-full')}>{children}</div>
    </div>
  );
}

export default AspectRatio;
