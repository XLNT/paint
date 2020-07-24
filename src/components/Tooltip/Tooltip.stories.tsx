import React from 'react';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';
import { Tooltip } from './Tooltip';
import { text } from '@storybook/addon-knobs';
import { cn } from '../../utils/cn';
import { H3 } from '../Text/Text';

export default {
  title: 'Tooltip',
};

export const TooltipButton = () => (
  <div className={cn('space-y-4')}>
    <H3>Tooltip Button</H3>
    <div className={cn('flex flex-row', 'space-x-4')}>
      <Tooltip text={text('Tooltip Text', 'Hello World')}>
        <Button onPress={action('onPress')}>Do the Thing</Button>
      </Tooltip>
      <Tooltip text={text('Tooltip Text', 'Hello World')} isDisabled>
        <Button onPress={action('onPress')} isDisabled>
          Do the Thing
        </Button>
      </Tooltip>
    </div>
  </div>
);
