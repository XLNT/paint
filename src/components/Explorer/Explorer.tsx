import React, { PropsWithChildren, ReactNode, useReducer, ReactElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';
import { Text } from '../Text/Text';
import { mergeProps } from '@react-aria/utils';
import { useCombobox } from 'downshift';

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
  items?: TResultItem[];
  renderResultItem?: (state: { item: TResultItem; active: boolean }) => ReactNode;
  itemToString?: (item: TResultItem | null) => string;
  onSelectItem?: (item: TResultItem | null | undefined) => void;

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

export function Explorer<TResultItem extends ResultItem>({
  children,
  className,
  search,
  setSearch,
  searching,
  placeholder,
  loading,
  items,
  renderResultItem,
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
}: ExplorerProps<TResultItem>) {
  // searching can only happen at the top level, where there is no back button
  const canSearch = !!setSearch;

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

    return cloneElement(start as ReactElement, { className: startButtonClassnames });
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
          className={cn(middleElementClassnames, 'flex-1 min-w-0')}
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
    <div className={cn(className, 'relative bg-gesso', 'flex flex-col min-w-0')}>
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
          <ul className={cn(!isSearching && 'hidden')} {...getMenuProps()}>
            {!searching && (!items || items.length === 0) && placeholder}
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <li key={item.key} {...getItemProps({ item, index })}>
                  {renderResultItem?.({ item, active: highlightedIndex === index })}
                </li>
              ))}
            {searching && loading}
          </ul>
        </div>
      </div>
      {children && <div className={cn('flex flex-row')}>{children}</div>}
    </div>
  );
}
