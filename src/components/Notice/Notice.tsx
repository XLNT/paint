import React, { PropsWithChildren, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { BoldText, Text } from '../Text/Text';
import { mergeProps } from '@react-aria/utils';
import { WithClassName } from '../../utils/WithClassName';
import { filterComponentProps } from '../../utils/filterComponentProps';

export function Notice({
  children,
  title,
  subtitle,
  action,
  ...extra
}: PropsWithChildren<{
  title: ReactNode;
  subtitle: ReactNode;
  action: ReactNode;
}> &
  WithClassName) {
  return (
    <div
      {...mergeProps(filterComponentProps(extra), {
        className: cn('relative bg-gesso', 'flex flex-col'),
      })}
    >
      <div className={cn('flex-1 flex flex-col items-center', 'my-8 space-y-4')}>
        <div className={cn('mx-4')}>
          <BoldText className={cn('text-center')}>{title}</BoldText>
          <Text className={cn('text-center')}>{subtitle}</Text>
        </div>
        {children}
        {action && <div className={cn('mx-4')}>{action}</div>}
      </div>
    </div>
  );
}
