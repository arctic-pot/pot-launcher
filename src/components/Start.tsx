import React from 'react';
import './Start.scss';
import { FormattedMessage } from 'react-intl';

export default function Start(): React.ReactElement {
  return (
    <>
      <button id="start-game-button">
        <FormattedMessage id="start.launch" defaultMessage="Launch" />
      </button>
    </>
  );
}
