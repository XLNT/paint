import React, { ReactNode } from 'react';
import { H3 } from '../Text/Text';
import { cn } from '../../utils/cn';
import { Notice } from './Notice';
import { Button } from '../Button/Button';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Notice',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/oSYDK9EcHtXRJ4cTUK14nU/interface?node-id=3420%3A8377',
    },
  },
};

const basicNotice = (
  title: string,
  subtitle: string,
  actionText: string,
  children?: ReactNode,
) => () => (
  <div className={cn('space-y-4 w-full md:w-1/2')}>
    <H3>{title}</H3>
    <Notice
      title={text('Title', title)}
      subtitle={text('Text', subtitle)}
      action={<Button onPress={action('onPress')}>{text('Action', actionText)}</Button>}
    >
      {children}
    </Notice>
  </div>
);

export const Chat = basicNotice(
  `Chat`,
  `Each room has its own chat. When you move rooms, you also move into a new conversation.`,
  `Neat, let's go`,
);

export const Inquiries = basicNotice(
  `Inquiries`,
  `When you inquire about a work, you open a private, one-on-one conversation with an exhibit manager.`,
  `Neat, let's go`,
);

export const Error = basicNotice(
  `Hold up`,
  `Messages are capped at 500 characters each.`,
  `Ok, got it`,
);

export const Confirmation = () => (
  <div className={cn('space-y-4 w-1/2')}>
    <H3>Confirmation Notice</H3>
    <Notice
      title={text('Title', 'Claim')}
      subtitle={text(
        'Text',
        `This inquiry request was sent to all managers of [space name]. Each inquiry can only be claimed by one person. When this inquiry is claimed, the notification be removed from all other managers’ messaging feeds and a one-on-one chat will be opened.`,
      )}
      action={
        <div className={cn('flex flex-col justify-center items-center space-y-2')}>
          <Button onPress={action('onPress')}>Claim inquiry</Button>
          <Button onPress={action('cancel')} tertiary>
            Cancel
          </Button>
        </div>
      }
    />
  </div>
);

export const FormInput = () => (
  <div className={cn('space-y-4 w-1/2')}>
    <H3>With Form Input</H3>
    <Notice
      title={text('Title', 'Moniker')}
      subtitle={text('Text', `What name do you go by?`)}
      action={<Button onPress={action('onPress')}>Join chat</Button>}
    >
      <div className={cn('bg-concrete text-gesso h-12 w-full')}>TODO: forms</div>
    </Notice>
  </div>
);
