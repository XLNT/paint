import React, { PropsWithChildren } from 'react';
import OpenIcon from '../../icons/tag/open.svg';
import ClosedIcon from '../../icons/tag/closed.svg';
import { SubText } from '../Text/Text';
import { cn } from '../../utils/cn';

export function Capacity({ canEnter = false, children }: PropsWithChildren<{ canEnter: boolean }>) {
  return (
    <SubText className={cn('flex flex-row items-center', 'space-x-1')}>
      <span>{canEnter ? <OpenIcon /> : <ClosedIcon />}</span>
      <span>{children}</span>
    </SubText>
  );
}
