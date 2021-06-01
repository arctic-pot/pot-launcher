import React from 'react';
import './Body.scss';
import Profile from './Profile';

export default function Body() {
  return (
    <div id="body">
      <div id="versions-parent" className="body-part">Installed Versions</div>
      <div id="background-parent" className="body-part">An image</div>
      <div id="profile-parent" className="body-part"><Profile /></div>
      <div id="start-parent" className="body-part">Start Game</div>
    </div>
  )
}
