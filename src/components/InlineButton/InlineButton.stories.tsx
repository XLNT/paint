import React from 'react';
import { InlineButton } from './InlineButton';
import { cn } from '../../utils/cn';

import { ReactComponent as AnyIcon } from '../../assets/icon/search.svg';
import { InlineButtonGroup } from './InlineButtonGroup';

export default {
  title: 'InlineButton',
};

export const JustIcon = () => <InlineButton icon={<AnyIcon />} />;

export const ButtonGroup = () => (
  <InlineButtonGroup className={cn('w-64')}>
    <InlineButton className={cn('flex-1')} icon={<AnyIcon />}>
      Save
    </InlineButton>
    <InlineButton className={cn('flex-1')} icon={<AnyIcon />}>
      Share
    </InlineButton>
    <InlineButton className={cn('flex-1')} icon={<AnyIcon />}>
      Geography
    </InlineButton>
  </InlineButtonGroup>
);
