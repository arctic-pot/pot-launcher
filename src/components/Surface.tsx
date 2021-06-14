import React from 'react';
import './Surface.scss';
import { FormattedMessage } from 'react-intl';

export default function Surface(): React.ReactElement {
  interface SurfaceButtonProps {
    icon?: React.ReactElement;
    text: string;
  }
  function SurfaceButton(props: SurfaceButtonProps) {
    return (
      <div className="surface-button">
        <div className="surface-button-icon">{props.icon}</div>
        <div className="surface-button-text">
          <FormattedMessage id={props.text} />
        </div>
      </div>
    );
  }
  return (
    <>
      <SurfaceButton text="settings.title" icon={<i className="bi-gear" />} />
      <SurfaceButton text="nat.title" icon={<i className="bi-hdd-network" />} />
      <SurfaceButton text="social.title" icon={<i className="bi-people" />} />
    </>
  );
}
