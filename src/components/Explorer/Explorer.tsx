import React, { PropsWithChildren, ReactNode, useReducer, ReactElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { Text } from '../Text/Text';
import { mergeProps } from '@react-aria/utils';
import { useCombobox } from 'downshift';

interface ExplorerProps<TItem> extends WithClassName, PropsWithChildren<{}> {
  search?: string;
  setSearch?: (search: string) => void;
  searching?: boolean;
  placeholder?: ReactNode;
  loading?: ReactNode;
  notFound?: ReactNode;
  items?: TItem[];
  renderResultItem?: (state: { item: TItem; active: boolean }) => ReactNode;
  itemToKey?: (item: TItem) => string;
  itemToString?: (item: TItem | null) => string;
  onSelectItem?: (item: TItem | null | undefined) => void;

  menu?: ReactElement;
  start?: ReactElement;
  end?: ReactElement;
  content?: ReactNode;

  searchIcon: ReactElement;
  menuIcon: ReactElement;
  closeIcon: ReactElement;
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

export function Explorer<TItem>({
  children,
  className,
  search,
  setSearch,
  searching,
  placeholder,
  loading,
  notFound,
  items,
  renderResultItem,
  itemToKey,
  itemToString,
  onSelectItem,
  //
  content,
  start,
  menu,
  //
  searchIcon,
  menuIcon,
  closeIcon,
}: ExplorerProps<TItem>) {
  // searching can only happen at the top level, where there is no back button
  const canSearch = !!setSearch;
  const noItems = !items || items.length === 0;
  const hasSearchText = search && search.length > 0;

  const [{ isSearching, isMenu }, dispatch] = useReducer(reducer, INITIAL_STATE);
  const isPopover = isSearching || isMenu;
  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useCombobox({
    items: items ?? [],
    inputValue: search,
    itemToString,
    onInputValueChange: ({ inputValue }) => setSearch?.(inputValue ?? ''),
    onSelectedItemChange: ({ selectedItem }) => onSelectItem?.(selectedItem),
  });

  const startButtonClassnames = cn(
    'border border-transparent',
    isMenu && 'border-b-bruise',
    isSearching && 'border-t-bruise border-l-bruise border-r-bruise',
  );
  const middleElementClassnames = cn(
    'flex-1 min-w-0',
    'border-b',
    isPopover ? 'border-bruise' : 'border-transparent',
  );
  const endButtonClassnames = cn(
    'border border-transparent',
    isSearching && 'border-b-bruise',
    isMenu && 'border-t-bruise border-l-bruise border-r-bruise',
  );

  const renderStartItem = () => {
    if (canSearch) {
      return (
        <InlineButton
          className={startButtonClassnames}
          icon={searchIcon}
          onPress={() => dispatch({ type: 'toggleSearching' })}
        />
      );
    }

    return start && cloneElement(start as ReactElement, { className: startButtonClassnames });
  };

  const renderMiddleItem = () => {
    if (isSearching) {
      return (
        <input
          {...getInputProps()}
          className={cn(
            middleElementClassnames,
            'p-2 leading-normal',
            'overflow-hidden',
            'bg-transparent placeholder-concrete',
            'outline-none',
          )}
          autoFocus
        />
      );
    }

    if (canSearch) {
      return (
        <InlineButton
          onPress={() => dispatch({ type: 'toggleSearching' })}
          className={cn(middleElementClassnames)}
          isDisabled={!canSearch}
        >
          {content}
        </InlineButton>
      );
    }

    return (
      <Text as="span" className={cn(middleElementClassnames, 'flex-1', 'p-2 truncate select-none')}>
        {content}
      </Text>
    );
  };

  const renderEndItem = () => {
    return (
      <InlineButton
        {...mergeProps(isSearching ? { onPress: reset } : {}, {
          onPress: () =>
            isSearching ? dispatch({ type: 'toggleSearching' }) : dispatch({ type: 'toggleMenu' }),
        })}
        className={endButtonClassnames}
        icon={isMenu || isSearching ? closeIcon : menuIcon}
      />
    );
  };

  return (
    <div className={cn(className, 'bg-gesso', 'flex flex-col min-w-0')}>
      <div
        className={cn('relative', 'flex flex-row items-stretch min-w-0')}
        {...getComboboxProps()}
      >
        {renderStartItem()}
        {renderMiddleItem()}
        {renderEndItem()}
        <div
          key="menu"
          className={cn(
            !isPopover && 'hidden',
            'absolute top-full left-0 right-0 z-10',
            'bg-gesso',
            'border-l border-r border-b border-bruise',
          )}
        >
          {isMenu && menu}
          {/* apparently this ul needs to always be in the dom for a11y reasons? */}
          <ul className={cn(!isSearching && 'hidden')} {...getMenuProps()}>
            {isSearching && !searching && noItems && hasSearchText && notFound}
            {isSearching && !searching && noItems && !hasSearchText && placeholder}
            {isSearching &&
              items &&
              items.length > 0 &&
              items.map((item, index) => (
                <li key={itemToKey?.(item)} {...getItemProps({ item, index })}>
                  {renderResultItem?.({ item, active: highlightedIndex === index })}
                </li>
              ))}
            {isSearching && searching && loading}
          </ul>
        </div>
      </div>
      {children && <div className={cn('flex flex-row')}>{children}</div>}
    </div>
  );
}
