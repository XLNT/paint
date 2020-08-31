import React, { useState } from 'react';
import { Explorer } from './Explorer';
import { cn } from '../../utils/cn';
import { InlineButtonGroup } from '../InlineButton/InlineButtonGroup';
import { InlineButton } from '../InlineButton/InlineButton';
import { Skeleton } from '../Skeleton/Skeleton';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';

import { ReactComponent as BackIcon } from '../../assets/icon/back.svg';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { ReactComponent as MenuIcon } from '../../assets/icon/menu.svg';
import { ReactComponent as CloseIcon } from '../../assets/icon/close.svg';
import { ReactComponent as ExpandIcon } from '../../assets/icon/down arrow.svg';
import { ReactComponent as CollapseIcon } from '../../assets/icon/down arrow.svg';
import { ReactComponent as CancelIcon } from '../../assets/icon/close.svg';

export default {
  title: 'Explorer',
};

interface SelectItem {
  value: string;
}
const ITEMS: SelectItem[] = new Array(100).fill(0).map((_, i) => ({
  value: i.toString(),
}));

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

export const Empty = () => (
  <Explorer
    className={cn('w-64')}
    searchIcon={<SearchIcon />}
    menuIcon={<MenuIcon />}
    closeIcon={<CloseIcon />}
  />
);

export const EmptyWithActions = () => (
  <Explorer
    className={cn('w-64')}
    content={<Skeleton className={cn('w-full h-6')} />}
    menu={menu}
    searchIcon={<SearchIcon />}
    menuIcon={<MenuIcon />}
    closeIcon={<CloseIcon />}
  >
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
  const [medium, setMedium] = useState<SelectItem | null>(null);
  const [geo, setGeo] = useState<SelectItem | null>(null);
  return (
    <Explorer
      className={cn('w-64')}
      search={search}
      setSearch={setSearch}
      content="Ars Electronica + .art Domains Curated"
      searching={search.length === 1 || search.length === 2}
      placeholder={<Text className={cn('p-2 text-center')}>Placeholder text...</Text>}
      loading={<Text className={cn('p-2 text-center')}>Loading state...</Text>}
      notFound={<Text className={cn('p-2 text-center')}>Not found state...</Text>}
      items={search.length > 1 && search.length < 5 ? SEARCH_RESULTS : undefined}
      itemToKey={(item) => item?.key}
      itemToString={(item) => item?.title ?? ''}
      onSelectItem={(item) => item && alert(item?.title)}
      renderResultItem={({ item, active }) => (
        <a href="https://google.com">
          <div
            className={cn(
              'flex flex-row justify-between items-center',
              'p-2',
              active && 'bg-smudge',
              'hover:bg-smudge',
            )}
          >
            <Text className={cn('flex-1 truncate')}>{item.title}</Text>
            <Text>{item.type}</Text>
          </div>
        </a>
      )}
      menu={menu}
      searchIcon={<SearchIcon />}
      menuIcon={<MenuIcon />}
      closeIcon={<CloseIcon />}
    >
      <InlineButtonGroup className={cn('w-full')}>
        <Select
          className={cn('flex-1')}
          items={ITEMS}
          selectedItem={medium}
          onSelectItem={setMedium}
          renderItem={({ item }) => item.value}
          itemToKey={(item) => item.value}
          expandIcon={<ExpandIcon />}
          collapseIcon={<CollapseIcon />}
          cancelIcon={<CancelIcon />}
        >
          Medium
        </Select>
        <Select
          className={cn('flex-1')}
          items={ITEMS}
          selectedItem={geo}
          onSelectItem={setGeo}
          itemToKey={(item) => item.value}
          renderItem={({ item }) => item.value}
          expandIcon={<ExpandIcon />}
          collapseIcon={<CollapseIcon />}
          cancelIcon={<CancelIcon />}
        >
          Geography
        </Select>
      </InlineButtonGroup>
    </Explorer>
  );
};

export const SpaceExplorer = () => (
  <Explorer
    className={cn('w-64')}
    start={backLink}
    content="Space name"
    menu={menu}
    searchIcon={<SearchIcon />}
    menuIcon={<MenuIcon />}
    closeIcon={<CloseIcon />}
  />
);

export const WorkExplorer = () => (
  <Explorer
    className={cn('w-64')}
    start={backLink}
    content={<span className={cn('italic')}>Work title</span>}
    menu={menu}
    searchIcon={<SearchIcon />}
    menuIcon={<MenuIcon />}
    closeIcon={<CloseIcon />}
  />
);
