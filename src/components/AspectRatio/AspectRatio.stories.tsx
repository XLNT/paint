import React from 'react';
import { cn } from '../../utils/cn';
import { H3 } from '../Text/Text';
import { AspectRatio } from './AspectRatio';

export default {
  title: 'Aspect Ratio',
};

const Box = ({ aspectRatio = 1 }: { aspectRatio: number }) => (
  <AspectRatio aspectRatio={aspectRatio}>
    <div className={cn('h-full w-full', 'bg-bruise')}></div>
  </AspectRatio>
);

export const Example = () => (
  <div className={cn('flex flex-row', 'space-x-4')}>
    <div className={cn('flex flex-col', 'space-y-4')}>
      <H3>1:1</H3>
      <Box aspectRatio={1} />
    </div>
    <div className={cn('flex flex-col', 'space-y-4')}>
      <H3>16:9</H3>
      <Box aspectRatio={0.5625} />
    </div>
    <div className={cn('flex flex-col', 'space-y-4')}>
      <H3>4:3</H3>
      <Box aspectRatio={0.75} />
    </div>
  </div>
);
