import React, { PropsWithChildren } from 'react';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { SubText } from '../Text/Text';

export function Tooltip({
  text,
  isDisabled,
  children,
  ...extra
}: PropsWithChildren<{ text: string; isDisabled?: boolean } & WithClassName>) {
  const { hoverProps, isHovered } = useHover({ isDisabled });

  return (
    <div {...mergeProps(hoverProps, extra, { className: cn('relative') })}>
      {children}
      <SubText
        className={cn(
          'absolute left-0 top-0 text-center whitespace-no-wrap',
          'transform origin-bottom',
          'transition ease-in-out duration-300',
          'text-concrete',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          marginLeft: '50%',
          transform: `translate(-50%, ${isHovered ? '-1rem' : '-0.9rem'})`,
        }}
      >
        {text}
      </SubText>
    </div>
  );
}
