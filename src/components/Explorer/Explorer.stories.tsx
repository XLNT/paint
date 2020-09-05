import React from 'react';
import { Explorer, buttonBorderForState, BorderState } from './Explorer';
import { cn } from '../../utils/cn';
import { InlineButton } from '../InlineButton/InlineButton';
import { Text } from '../Text/Text';

import { ReactComponent as BackIcon } from '../../assets/icon/back.svg';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { ReactComponent as MenuIcon } from '../../assets/icon/menu.svg';

export default {
  title: 'Explorer',
};

export const Simple = () => (
  <Explorer
    className={cn('w-64')}
    start={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<BackIcon />} />}
    middle={<Text className={buttonBorderForState(BorderState.None)}>Hello There</Text>}
    end={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<MenuIcon />} />}
  />
);

export const SimpleSingle = () => (
  <Explorer
    className={cn('w-64')}
    start={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<BackIcon />} />}
    middle={<Text className={buttonBorderForState(BorderState.None)}>Hello There</Text>}
    end={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<MenuIcon />} />}
  >
    <InlineButton className={buttonBorderForState(BorderState.None)}>Medium</InlineButton>
  </Explorer>
);

export const Popovered = () => (
  <div className={cn('flex flex-row space-x-4')}>
    <Explorer
      className={cn('w-64')}
      start={
        <InlineButton
          className={buttonBorderForState(BorderState.Selected)}
          icon={<SearchIcon />}
        />
      }
      middle={<Text className={buttonBorderForState(BorderState.Unselected)}>Hello There</Text>}
      end={
        <InlineButton
          className={buttonBorderForState(BorderState.Unselected)}
          icon={<MenuIcon />}
        />
      }
      topPopunder={<div className={cn('h-24')} />}
    />
    <Explorer
      className={cn('w-64')}
      start={
        <InlineButton
          className={buttonBorderForState(BorderState.Unselected)}
          icon={<SearchIcon />}
        />
      }
      middle={<Text className={buttonBorderForState(BorderState.Unselected)}>Hello There</Text>}
      end={
        <InlineButton className={buttonBorderForState(BorderState.Selected)} icon={<MenuIcon />} />
      }
      topPopunder={<div className={cn('h-24')} />}
    />
  </div>
);

export const WithActions = () => (
  <Explorer
    className={cn('w-64')}
    start={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<BackIcon />} />}
    middle={<Text className={buttonBorderForState(BorderState.None)}>Hello There</Text>}
    end={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<MenuIcon />} />}
  >
    <InlineButton className={buttonBorderForState(BorderState.None)}>Medium</InlineButton>
    <InlineButton className={buttonBorderForState(BorderState.None)}>Geography</InlineButton>
  </Explorer>
);

export const WithActionsPopovered = () => (
  <div className={cn('flex flex-row space-x-4')}>
    <Explorer
      className={cn('w-64')}
      start={
        <InlineButton className={buttonBorderForState(BorderState.None)} icon={<BackIcon />} />
      }
      middle={<Text className={buttonBorderForState(BorderState.None)}>Hello There</Text>}
      end={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<MenuIcon />} />}
      bottomPopunder={<div className={cn('h-24')} />}
    >
      <InlineButton className={buttonBorderForState(BorderState.Selected)}>Medium</InlineButton>
      <InlineButton className={buttonBorderForState(BorderState.Unselected)}>
        Geography
      </InlineButton>
    </Explorer>
    <Explorer
      className={cn('w-64')}
      start={
        <InlineButton className={buttonBorderForState(BorderState.None)} icon={<BackIcon />} />
      }
      middle={<Text className={buttonBorderForState(BorderState.None)}>Hello There</Text>}
      end={<InlineButton className={buttonBorderForState(BorderState.None)} icon={<MenuIcon />} />}
      bottomPopunder={<div className={cn('h-24')} />}
    >
      <InlineButton className={buttonBorderForState(BorderState.Unselected)}>Medium</InlineButton>
      <InlineButton className={buttonBorderForState(BorderState.Selected)}>Geography</InlineButton>
    </Explorer>
  </div>
);
