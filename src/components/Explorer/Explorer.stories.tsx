import React from 'react';
import { Explorer } from './Explorer';
import { cn } from '../../utils/cn';
import { InlineButtonGroup } from '../InlineButton/InlineButtonGroup';
import { InlineButton } from '../InlineButton/InlineButton';
import { Skeleton } from '../Skeleton/Skeleton';
import { Text } from '../Text/Text';

import { ReactComponent as BackIcon } from '../../icons/nav left.svg';
import { ReactComponent as ToggleIcon } from '../../icons/nav down.svg';

export default {
  title: 'Explorer',
};

const backLink = <InlineButton elementType="a" href="https://google.com" icon={<BackIcon />} />;

export const Empty = () => <Explorer className={cn('w-64')} />;

export const EmptyWithActions = () => (
  <Explorer className={cn('w-64')} content={<Skeleton className={cn('w-full h-6')} />} event>
    <InlineButtonGroup className={cn('w-64')}>
      <InlineButton className={cn('flex-1')}>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
      <InlineButton className={cn('flex-1')}>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
      <InlineButton className={cn('flex-1')}>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
    </InlineButtonGroup>
  </Explorer>
);

export const EventExplorer = () => (
  <Explorer
    className={cn('w-64')}
    content={<Text className={cn('truncate')}>Ars Electronica + .art Domains Curated</Text>}
    event
  >
    <InlineButtonGroup className={cn('w-64')}>
      <InlineButton className={cn('flex-1')} icon={<ToggleIcon />}>
        Medium
      </InlineButton>
      <InlineButton className={cn('flex-1')} icon={<ToggleIcon />}>
        Geography
      </InlineButton>
    </InlineButtonGroup>
  </Explorer>
);

export const SpaceExplorer = () => (
  <Explorer
    className={cn('w-64')}
    start={backLink}
    content={<Text className={cn('truncate')}>Space name</Text>}
  />
);

export const WorkExplorer = () => (
  <Explorer
    className={cn('w-64')}
    start={backLink}
    content={<Text className={cn('truncate italic')}>Work title</Text>}
  />
);
