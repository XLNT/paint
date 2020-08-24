import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { WithClassName } from '../../utils/WithClassName';
import { InlineButton } from '../InlineButton/InlineButton';

import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import useToggle from 'react-use/lib/useToggle';

interface ExplorerProps extends WithClassName, PropsWithChildren<{}> {
  event?: boolean;
  start?: ReactNode;
  end?: ReactNode;
  content?: ReactNode;
  popover?: ReactNode;
}

export function Explorer({ children, className, content, start, popover, event }: ExplorerProps) {
  const [isSearching, toggleIsSearching] = useToggle(false);

  return (
    <div className={cn(className, 'relative', 'flex flex-col', 'bg-gesso')}>
      <div className={cn('flex flex-row items-stretch')}>
        {event ? <InlineButton icon={<SearchIcon />} onPress={toggleIsSearching} /> : start}
        {isSearching ? (
          <input
            className={cn(
              'm-2 leading-normal',
              'overflow-hidden',
              'bg-transparent placeholder-concrete',
              'outline-none',
            )}
            autoFocus
          />
        ) : (
          <InlineButton onPress={toggleIsSearching} className={cn('flex-1 min-w-0')}>
            {content}
          </InlineButton>
        )}
        <InlineButton icon={<MenuIcon />} />
      </div>
      {children && <div className={cn('flex flex-row')}>{children}</div>}
      {popover}
    </div>
  );
}
