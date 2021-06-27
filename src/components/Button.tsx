import React from 'react';
import { Size } from './@types/enums';
import classnames from 'utils/classnames';
import './Button.scss';

interface ButtonProps {
  primary?: boolean;
  danger?: boolean;
  shadow?: boolean;
  fontSize?: Size;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { primary, danger, shadow, width, height, id, className, children, onClick } = props;
  return (
    <button
      id={id}
      className={classnames('button', className, { shadow, 'button-primary': primary, 'button-danger': danger })}
      style={{ width, height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  fontSize: Size.sm,
};

export default Button;
