import React from 'react';
import { Size } from './@types/enums';
import classnames from 'utils/classnames';

interface ButtonProps {
  primary?: boolean;
  danger?: boolean;
  shadow?: boolean;
  fontSize?: Size;
  width: number;
  height: number;
  className: string;
  id?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { primary, danger, shadow, width, height, id, className, children } = props;
  return (
    <button
      id={id}
      className={classnames('button', className, { shadow, 'button-primary': primary, 'button-danger': danger })}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  fontSize: Size.sm,
};

export default Button;
