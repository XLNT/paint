import React, { PropsWithChildren, ReactNode, useReducer } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { Item } from '@react-stately/collections';

import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { SearchField } from '../SearchField/SearchField';
import { ListBox } from '../ListBox/ListBox';
import { Text } from '../Text/Text';

interface ResultItem {
  key: string;
}

interface ExplorerProps<TResultItem extends ResultItem>
  extends WithClassName,
    PropsWithChildren<{}> {
  search?: string;
  setSearch?: (search: string) => void;
  searching?: boolean;
  placeholder?: ReactNode;
  loading?: ReactNode;
  results?: TResultItem[];
  renderResultItem?: (result: TResultItem) => ReactNode;

  menu?: ReactNode;
  start?: ReactNode;
  end?: ReactNode;
  content?: ReactNode;
}

interface State {
  isSearching: boolean;
  isMenu: boolean;
}

type Action = { type: 'toggleSearching' } | { type: 'toggleMenu' } | { type: 'defocusSearch' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'toggleSearching':
      return { ...state, isSearching: !state.isSearching, isMenu: false };
    case 'toggleMenu':
      return { ...state, isSearching: false, isMenu: !state.isMenu };
    case 'defocusSearch':
      return { ...state, isSearching: state.isSearching ? false : state.isSearching };

    default:
      return state;
  }
}

const INITIAL_STATE: State = { isSearching: false, isMenu: false };

export function Explorer<TResultItem extends ResultItem>({
  children,
  className,
  search,
  setSearch,
  searching,
  placeholder,
  loading,
  results,
  renderResultItem: renderResult,
  content,
  start,
  menu,
}: ExplorerProps<TResultItem>) {
  // searching can only happen at the top level, where there is no back button
  const canSearch = !!setSearch;

  const [{ isSearching, isMenu }, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div className={cn(className, 'relative bg-gesso', 'flex flex-col min-w-0')}>
      <div className={cn('relative', 'flex flex-row items-stretch min-w-0')}>
        {canSearch ? (
          <InlineButton
            className={cn(
              'border-l border-t border-r',
              isSearching ? 'border-bruise' : 'border-transparent',
            )}
            icon={<SearchIcon />}
            onPress={() => dispatch({ type: 'toggleSearching' })}
          />
        ) : (
          start
        )}
        {isSearching ? (
          <SearchField
            value={search}
            onChange={setSearch}
            className={cn(
              'm-2 leading-normal',
              'overflow-hidden',
              'bg-transparent placeholder-concrete',
              'outline-none',
            )}
            autoFocus
          />
        ) : canSearch ? (
          <InlineButton
            onPress={() => dispatch({ type: 'toggleSearching' })}
            className={cn('flex-1 min-w-0')}
            isDisabled={!canSearch}
          >
            {content}
          </InlineButton>
        ) : (
          <Text className={cn('flex-1', 'p-2 truncate')}>{content}</Text>
        )}
        <InlineButton
          className={cn(
            'border-l border-t border-r',
            isMenu ? 'border-bruise' : 'border-transparent',
          )}
          icon={isMenu || isSearching ? <CloseIcon /> : <MenuIcon />}
          onPress={() =>
            isSearching ? dispatch({ type: 'toggleSearching' }) : dispatch({ type: 'toggleMenu' })
          }
        />
        {isMenu && (
          <div
            className={cn('absolute top-full left-0 right-0', 'bg-gesso', 'border border-bruise')}
          >
            {menu}
          </div>
        )}
        {isSearching && (
          <div
            className={cn('absolute top-full left-0 right-0', 'bg-gesso', 'border border-bruise')}
          >
            {!searching && (!results || results.length === 0) && placeholder}
            {results && results.length > 0 && (
              <ListBox items={results} selectionMode="single">
                {(item) => <Item key={item.key}>{renderResult?.(item)}</Item>}
              </ListBox>
            )}
            {searching && loading}
          </div>
        )}
      </div>
      {children && <div className={cn('flex flex-row')}>{children}</div>}
    </div>
  );
}
