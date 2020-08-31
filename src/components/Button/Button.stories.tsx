import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Button } from './Button';
import { H3 } from '../Text/Text';
import { cn } from '../../utils/cn';

import { ReactComponent as AnyIcon } from '../../assets/icon/search.svg';

export default {
  title: 'Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/oSYDK9EcHtXRJ4cTUK14nU/interface?node-id=1022%3A93277',
    },
  },
};

export const Primary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')}>{text('Text', 'Hello World')}</Button>
      <Button onPress={action('onPress')}>
        <AnyIcon />
        <span>{text('Text', 'Hello World')}</span>
      </Button>
      <Button onPress={action('onPress')}>
        <span>{text('Text', 'Hello World')}</span>
        <AnyIcon />
      </Button>
    </div>
    <H3>Disabled</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} isDisabled>
        <AnyIcon />
        <span>{text('Text', 'Hello World')}</span>
      </Button>
      <Button onPress={action('onPress')} isDisabled>
        <span>{text('Text', 'Hello World')}</span>
        <AnyIcon />
      </Button>
    </div>
    <H3>Icon</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} icon>
        <AnyIcon />
      </Button>
      <Button onPress={action('onPress')} icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
    <H3>Danger</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} danger>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} danger isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} danger icon>
        <AnyIcon />
      </Button>
      <Button onPress={action('onPress')} danger icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
  </div>
);

export const Secondary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} secondary>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} secondary icon>
        <AnyIcon />
      </Button>
    </div>
    <H3>Disabled</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} secondary isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} secondary icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
    <H3>Active</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} secondary active>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} secondary icon active>
        <AnyIcon />
      </Button>
    </div>
    <H3>Danger</H3>
    <div className={cn('space-x-4', 'flex flex-row')}>
      <Button onPress={action('onPress')} secondary danger>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} secondary danger isDisabled>
        {text('Text', 'Hello World')}
      </Button>
      <Button onPress={action('onPress')} secondary danger icon>
        <AnyIcon />
      </Button>
      <Button onPress={action('onPress')} secondary danger icon isDisabled>
        <AnyIcon />
      </Button>
    </div>
  </div>
);

export const Tertiary = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <Button onPress={action('onPress')} tertiary>
      {text('Text', 'Hello World')}
    </Button>
    <H3>Disabled</H3>
    <Button onPress={action('onPress')} tertiary isDisabled>
      {text('Text', 'Hello World')}
    </Button>
    <H3>Danger</H3>
    <Button onPress={action('onPress')} tertiary danger>
      {text('Text', 'Hello World')}
    </Button>
    <Button onPress={action('onPress')} tertiary danger isDisabled>
      {text('Text', 'Hello World')}
    </Button>
  </div>
);

export const LinkButton = () => (
  <div className={cn('space-y-4')}>
    <H3>Link Button</H3>
    <Button
      elementType="a"
      target="_blank"
      href="https://softspot.art"
      rel="noopenner noreferrer nofollow"
    >
      Open Softspot in New Tab
    </Button>
  </div>
);

export const SubmitButton = () => (
  <Button onPress={action('onPress')} type="submit">
    {text('Text', 'Submit')}
  </Button>
);
