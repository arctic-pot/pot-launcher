import React from 'react';
import './TitleBar.scss';

export default function TitleBar() {
  return (
    <div id="title-bar">
      <span id="title">Pot Minecraft Launcher</span>
      <div id="title-buttons">
        <div className="title-button" onClick={() => void 0}>
          <i className="bi-dash"/>
        </div>
        <div className="title-button">
          <i className="bi-x"/>
        </div>
      </div>
    </div>
  );
}
