import React from 'react';
import { cn } from '../../utils/cn';
import { H3 } from '../Text/Text';
import { BranchingButton } from './BranchingButton';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Branching Button',
};

export const AddToCalendar = () => (
  <div className={cn('space-y-4')}>
    <H3>Add to Calendar</H3>
    <BranchingButton action={<Button secondary>+ Add to calendar</Button>}>
      <Button onPress={action('onPressA')} secondary autoFocus>
        Option a
      </Button>
      <Button onPress={action('onPressB')} secondary>
        Option b
      </Button>
    </BranchingButton>
  </div>
);
