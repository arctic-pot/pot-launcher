import React, { useMemo } from 'react';
import './Input.scss';
import classnames from 'utils/classnames';
import { labelId } from 'utils/generators';

interface ButtonProps {
  type?: 'text' | 'password';
  placeholder?: string;
  className?: string;
  id?: string;
  underlineOnly?: boolean;
  label: string | React.ReactElement;
}

const Input: React.FC<ButtonProps> = (props) => {
  const { type, className, label, underlineOnly, placeholder } = props;
  const id = useMemo(() => {
    return labelId();
  }, []);

  return (
    <>
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        name={id}
        type={type}
        placeholder={placeholder}
        className={classnames('input', { 'input-underline': underlineOnly }, className)}
      />
    </>
  );
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
