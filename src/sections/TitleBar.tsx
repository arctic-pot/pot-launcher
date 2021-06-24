import React from 'react';
import './TitleBar.scss';

export default function TitleBar(): React.ReactElement {
  return (
    <div id="title-bar">
      <span id="title">Pot Minecraft Launcher</span>
      <div id="title-buttons">
        {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
        <div className="title-button" onClick={() => location.reload()} title="Reload">
          <i className="bi-arrow-clockwise" />
        </div>
        <div className="title-button" id="minimize-button" title="Minimize">
          <i className="bi-dash" />
        </div>
        <div className="title-button" onClick={() => window.close()} title="Close">
          <i className="bi-x" />
        </div>
      </div>
    </div>
  );
}
