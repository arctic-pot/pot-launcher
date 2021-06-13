import React from 'react';
import './Surface.scss';

export default function Surface(): React.ReactElement {
  interface SurfaceButtonProps {
    icon?: React.ReactElement;
    text: string;
  }
  function SurfaceButton(props: SurfaceButtonProps) {
    return (
      <div className="surface-button">
        <div className="surface-button-icon">{props.icon}</div>
        <div className="surface-button-text">{props.text}</div>
      </div>
    );
  }
  return (
    <>
      <SurfaceButton text="Settings" icon={<i className="bi-gear" />} />
      <SurfaceButton text="Settings" icon={<i className="bi-gear" />} />
      <SurfaceButton text="Settings" icon={<i className="bi-gear" />} />
    </>
  );
}
