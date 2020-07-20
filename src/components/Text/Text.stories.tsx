import React from 'react';
import { cn } from '../../utils/cn';
import { H1, H2, H3, H4, Text, BoldText, SubText, LinkText, SlugText } from './Text';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Text',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/oSYDK9EcHtXRJ4cTUK14nU/interface?node-id=1022%3A93340',
    },
  },
};

export const All = () => {
  const child = text('Text', 'Hello World');
  return (
    <div className={cn('space-y-4')}>
      <H3>Headings</H3>
      <H1>{child}</H1>
      <H2>{child}</H2>
      <H3>{child}</H3>
      <H4>{child}</H4>
      <hr />
      <H3>Text</H3>
      <div className={cn('flex flex-row space-x-4')}>
        <Text>{child}</Text>
        <BoldText>{child}</BoldText>
        <Text className={cn('italic')}>{child}</Text>
        <Text className={cn('underline')}>{child}</Text>
      </div>
      <hr />
      <H3>SubText</H3>
      <div className={cn('flex flex-row space-x-4')}>
        <SubText>{child}</SubText>
        <SubText className={cn('font-bold')}>{child}</SubText>
        <SubText className={cn('italic')}>{child}</SubText>
        <SubText className={cn('underline')}>{child}</SubText>
      </div>
      <hr />
      <H3>LinkText</H3>
      <div className={cn('flex flex-row space-x-4')}>
        <LinkText>{child}</LinkText>
      </div>
      <hr />
      <H3>SlugText</H3>
      <div className={cn('flex flex-row space-x-4')}>
        <SlugText>{child}</SlugText>
      </div>
    </div>
  );
};
