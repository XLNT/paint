import React, { useState } from 'react';
import { Explorer } from './Explorer';
import { cn } from '../../utils/cn';
import { InlineButtonGroup } from '../InlineButton/InlineButtonGroup';
import { InlineButton } from '../InlineButton/InlineButton';
import { Skeleton } from '../Skeleton/Skeleton';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { ReactComponent as BackIcon } from '../../icons/nav left.svg';
import { ReactComponent as ToggleIcon } from '../../icons/nav down.svg';

export default {
  title: 'Explorer',
};

const backLink = <InlineButton elementType="a" href="https://google.com" icon={<BackIcon />} />;
const menu = (
  <div className={cn('flex flex-col justify-center items-center p-4 space-y-4')}>
    <Button>About</Button>
    <Button>Saved works</Button>
    <Button>Switch account</Button>
    <Button>Terms of Use</Button>
  </div>
);
const SEARCH_RESULTS = [
  { key: 'a', title: 'Resource title', type: 'Work' },
  { key: 'b', title: 'Resource title', type: 'Work' },
  { key: 'c', title: 'Resource title', type: 'Work' },
  { key: 'd', title: 'Resource title', type: 'Work' },
];

export const Empty = () => <Explorer className={cn('w-64')} />;

export const EmptyWithActions = () => (
  <Explorer className={cn('w-64')} content={<Skeleton className={cn('w-full h-6')} />} menu={menu}>
    <InlineButtonGroup className={cn('w-64')}>
      <InlineButton className={cn('flex-1')} isDisabled>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
      <InlineButton className={cn('flex-1')} isDisabled>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
      <InlineButton className={cn('flex-1')} isDisabled>
        <Skeleton className={cn('w-full h-6')} />
      </InlineButton>
    </InlineButtonGroup>
  </Explorer>
);

export const EventExplorer = () => {
  const [search, setSearch] = useState('');
  return (
    <Explorer
      className={cn('w-64')}
      search={search}
      setSearch={setSearch}
      content="Ars Electronica + .art Domains Curated"
      searching={search.length === 1}
      placeholder={<Text className={cn('p-2 text-center')}>Placeholder text...</Text>}
      loading={<Text className={cn('p-2 text-center')}>Loading state...</Text>}
      results={search.length > 1 ? SEARCH_RESULTS : undefined}
      renderResultItem={(item) => (
        <div className={cn('flex flex-row justify-between items-center', 'p-2', 'hover:bg-smudge')}>
          <Text className={cn('flex-1 truncate')}>{item.title}</Text>
          <Text>{item.type}</Text>
        </div>
      )}
      menu={menu}
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
};

export const SpaceExplorer = () => (
  <Explorer className={cn('w-64')} start={backLink} content="Space name" menu={menu} />
);

export const WorkExplorer = () => (
  <Explorer
    className={cn('w-64')}
    start={backLink}
    content={<span className={cn('italic')}>Work title</span>}
    menu={menu}
  />
);
