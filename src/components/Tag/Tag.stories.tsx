import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, color } from '@storybook/addon-knobs';
import { Tag } from './Tag';
import { H3 } from '../Text/Text';
import { cn } from '../../utils/cn';
import { Section, DefaultSection } from '../Section/Section';

export default {
  title: 'Tag',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/oSYDK9EcHtXRJ4cTUK14nU/interface?node-id=1022%3A93277',
    },
  },
};

export const General = () => (
  <div className={cn('space-y-4')}>
    <H3>Default / Idle</H3>
    <Tag onPress={action('onPress')}>{text('Text', 'Hello World')}</Tag>
    <H3>Active</H3>
    <Tag onPress={action('onPress')} active>
      {text('Text', 'Hello World')}
    </Tag>
    <H3>Disabled</H3>
    <Tag onPress={action('onPress')} isDisabled>
      {text('Text', 'Hello World')}
    </Tag>
  </div>
);

export const DefaultSectionTag = () => {
  const child = (
    <Section
      section={{
        color: color('Color', DefaultSection.color),
        name: text('Name', DefaultSection.name),
      }}
    />
  );

  return (
    <div className={cn('space-y-4')}>
      <H3>Default / Idle</H3>
      <Tag onPress={action('onPress')}>{child}</Tag>
      <H3>Active</H3>
      <Tag onPress={action('onPress')} active>
        {child}
      </Tag>
      <H3>Disabled</H3>
      <Tag onPress={action('onPress')} isDisabled>
        {child}
      </Tag>
    </div>
  );
};

export const SubSectionTag = () => {
  const child = (
    <Section
      section={{
        color: color('Color', DefaultSection.color),
        name: text('Name', DefaultSection.name),
      }}
      sub
    />
  );

  return (
    <div className={cn('space-y-4')}>
      <H3>Default / Idle</H3>
      <Tag onPress={action('onPress')}>{child}</Tag>
      <H3>Active</H3>
      <Tag onPress={action('onPress')} active>
        {child}
      </Tag>
      <H3>Disabled</H3>
      <Tag onPress={action('onPress')} isDisabled>
        {child}
      </Tag>
    </div>
  );
};
