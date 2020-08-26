import React, { PropsWithChildren, ReactNode, useReducer, useRef } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { Item } from '@react-stately/collections';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';
import { AriaSearchFieldProps } from '@react-types/searchfield';
import { ListBox } from '../ListBox/ListBox';
import { Text } from '../Text/Text';

import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { mergeProps } from '@react-aria/utils';

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
  const isPopover = isSearching || isMenu;
  const searchProps: AriaSearchFieldProps = {
    value: search,
    onChange: setSearch,
    'aria-label': 'Search',
    'aria-autocomplete': 'list',
    'aria-haspopup': 'listbox',
    excludeFromTabOrder: true,
    placeholder: 'Aa',
    autoFocus: true,
  };
  const state = useSearchFieldState(searchProps);
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputProps, clearButtonProps } = useSearchField(searchProps, state, inputRef as any);

  return (
    <div className={cn(className, 'relative bg-gesso', 'flex flex-col min-w-0')}>
      <div className={cn('relative', 'flex flex-row items-stretch min-w-0')}>
        {canSearch ? (
          <InlineButton
            className={cn(
              'border border-transparent',
              isMenu && 'border-b-bruise',
              isSearching && 'border-t-bruise border-l-bruise border-r-bruise',
            )}
            icon={<SearchIcon />}
            onPress={() => dispatch({ type: 'toggleSearching' })}
          />
        ) : (
          start
        )}
        {isSearching ? (
          <input
            ref={inputRef}
            {...inputProps}
            className={cn(
              'p-2 leading-normal',
              'overflow-hidden',
              'bg-transparent placeholder-concrete',
              'outline-none',
              'border-b',
              isPopover ? 'border-bruise' : 'border-transparent',
            )}
            autoFocus
          />
        ) : canSearch ? (
          <InlineButton
            onPress={() => dispatch({ type: 'toggleSearching' })}
            className={cn(
              'flex-1 min-w-0',
              'border-b',
              isPopover ? 'border-bruise' : 'border-transparent',
            )}
            isDisabled={!canSearch}
          >
            {content}
          </InlineButton>
        ) : (
          <Text className={cn('flex-1', 'p-2 truncate')}>{content}</Text>
        )}
        <InlineButton
          {...mergeProps(isSearching ? clearButtonProps : {}, {
            onPress: () =>
              isSearching
                ? dispatch({ type: 'toggleSearching' })
                : dispatch({ type: 'toggleMenu' }),
          })}
          className={cn(
            'border border-transparent',
            isSearching && 'border-b-bruise',
            isMenu && 'border-t-bruise border-l-bruise border-r-bruise',
          )}
          icon={isMenu || isSearching ? <CloseIcon /> : <MenuIcon />}
        />
        {isPopover && (
          <div
            className={cn(
              'absolute top-full left-0 right-0',
              'bg-gesso',
              'border-l border-r border-b border-bruise',
            )}
          >
            {isMenu && menu}
            {isSearching && (
              <>
                {!searching && (!results || results.length === 0) && placeholder}
                {results && results.length > 0 && (
                  <ListBox items={results} selectionMode="single">
                    {(item) => <Item key={item.key}>{renderResult?.(item)}</Item>}
                  </ListBox>
                )}
                {searching && loading}
              </>
            )}
          </div>
        )}
      </div>
      {children && <div className={cn('flex flex-row')}>{children}</div>}
    </div>
  );
}
