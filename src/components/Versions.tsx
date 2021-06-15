import React from 'react';
import './Versions.scss';
import { FormattedMessage } from 'react-intl';

export default function Versions(): React.ReactElement {
  return (
    <>
      <div id="versions-title">
        <FormattedMessage id="versions.installed" />
      </div>
      <div id="versions-installed"></div>
    </>
  );
}
