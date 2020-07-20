import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Notification } from './Notification';

export default {
  title: 'Notification',
};

export const Default = () => (
  <Notification>{text('Content', '[Space name] exhibit is at capacity.')}</Notification>
);

export const Sub = () => (
  <Notification sub>{text('Content', '[Space name] exhibit is at capacity.')}</Notification>
);
