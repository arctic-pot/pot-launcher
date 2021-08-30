import React from 'react';

interface DialogPropsWithoutChildren {
  open: boolean;
  onClose: () => void;
}

export type DialogProps = React.PropsWithChildren<DialogPropsWithoutChildren>;
