import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Notification } from './Notification';
import { cn } from '../../utils/cn';
import { H3, SubText, Text } from '../Text/Text';

import { ReactComponent as CloseIcon } from '../../assets/icon/close.svg';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Notification',
};

export const Default = () => {
  const child = text('Content', '[Space name] exhibit is at capacity.');
  const accessory = (
    <Button onPress={action('onClose')} icon secondary>
      <CloseIcon />
    </Button>
  );

  return (
    <div className={cn('flex flex-col items-start min-w-0', 'space-y-4')}>
      <H3>Collapsing</H3>
      <Notification>
        <Text>{child}</Text>
      </Notification>

      <H3>Expanded</H3>
      <Notification className={cn('w-full flex flex-row')}>
        <Text className={cn('flex-1 text-center')}>{child}</Text>
      </Notification>

      <H3>Collapsing with close icon</H3>
      <Notification accessory={accessory}>
        <Text>{child}</Text>
      </Notification>

      <H3>Expanded with close icon</H3>
      <Notification className={cn('w-full')} accessory={accessory}>
        <Text>{child}</Text>
      </Notification>

      <H3>Overflow (Wrap)</H3>
      <Notification className={cn('w-24')}>
        <Text>{child}</Text>
      </Notification>

      <H3>Overflow (Ellipses)</H3>
      <Notification className={cn('w-24')}>
        <Text className={cn('truncate')}>{child}</Text>
      </Notification>
    </div>
  );
};

export const Sub = () => {
  const child = text('Content', '[Space name] exhibit is at capacity.');

  return (
    <div className={cn('flex flex-col items-start', 'space-y-4')}>
      <H3>Collapsing</H3>
      <Notification>
        <SubText>{child}</SubText>
      </Notification>

      <H3>Expanded</H3>
      <Notification className={cn('w-full flex flex-row')}>
        <SubText className={cn('flex-1 text-center')}>{child}</SubText>
      </Notification>

      <H3>Overflow (Wrap)</H3>
      <Notification className={cn('w-24 flex flex-row')}>
        <SubText className={cn('flex-1 text-center')}>{child}</SubText>
      </Notification>

      <H3>Overflow (Ellipses)</H3>
      <Notification className={cn('w-24 flex flex-row')}>
        <SubText className={cn('flex-1 text-center truncate')}>{child}</SubText>
      </Notification>
    </div>
  );
};
