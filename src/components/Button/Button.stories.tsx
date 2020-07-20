import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Button } from './Button';
import { H3 } from '../Text/Text';
import { cn } from '../../utils/cn';

import { ReactComponent as AnyIcon } from '../../icons/expand.svg';

export default {
  title: 'Button',
};

export const Primary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')}>{text('Text', 'Hello World')}</Button>
      <Button onPress={action('clicked')}>
        <AnyIcon />
        <span>{text('Text', 'Hello World')}</span>
      </Button>
      <Button onPress={action('clicked')}>
        <span>{text('Text', 'Hello World')}</span>
        <AnyIcon />
      </Button>
    </div>
    <H3>Disabled</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')} isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('clicked')} isDisabled>
        <AnyIcon />
        <span>{text('Text', 'Hello World')}</span>
      </Button>
      <Button onPress={action('clicked')} isDisabled>
        <span>{text('Text', 'Hello World')}</span>
        <AnyIcon />
      </Button>
    </div>
    <H3>Icon</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')} icon>
        <AnyIcon />
      </Button>
      <Button onPress={action('clicked')} icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
  </div>
);

export const Secondary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')} secondary>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('clicked')} secondary icon>
        <AnyIcon />
      </Button>
    </div>
    <H3>Disabled</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')} secondary isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('clicked')} secondary icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
    <H3>Active</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('clicked')} secondary active>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('clicked')} secondary icon active>
        <AnyIcon />
      </Button>
    </div>
  </div>
);
export const Tertiary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <Button onPress={action('clicked')} tertiary>
      {text('Text', 'Hello World')}
    </Button>
    <H3>Disabled</H3>
    <Button onPress={action('clicked')} tertiary isDisabled>
      {text('Text', 'Hello World')}
    </Button>
  </div>
);
