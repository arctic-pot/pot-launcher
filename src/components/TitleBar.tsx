import React from 'react';
import './TitleBar.scss';

export default function TitleBar(): React.ReactElement {
  // TODO: I LOVE ELECTRON BECAUSE IT CAN'T USE IPC RENDER. I AM TRULY LOVVVVVE IT???
  return (
    <div id="title-bar">
      <span id="title">Pot Minecraft Launcher</span>
      <div id="title-buttons">
        {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
        <div className="title-button" id="minimize-button">
          <i className="bi-dash"/>
        </div>
        <div className="title-button" onClick={() => window.close()}>
          <i className="bi-x"/>
        </div>
      </div>
    </div>
  );
}
