import React, { cloneElement, ReactNode, ReactElement } from 'react';
import useToggle from 'react-use/lib/useToggle';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';

export function BranchingButton({
  action,
  children,
}: {
  action: ReactElement;
  children: ReactNode;
}) {
  const [open, toggle] = useToggle(false);

  return (
    <div className={cn('flex flex-row items-center', 'space-x-2')}>
      {open ? (
        <>
          {children}
          <Button onPress={toggle} tertiary>
            cancel
          </Button>
        </>
      ) : (
        cloneElement(action, { onPress: toggle })
      )}
    </div>
  );
}
