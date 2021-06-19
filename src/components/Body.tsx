import React from 'react';
import './Body.scss';
import Surface from './Surface';
import Profile from './Profile';
import Start from './Start';
import Versions from './Versions';
import { HashRouter } from 'react-router-dom';

export default function Body(): React.ReactElement {
  return (
    <HashRouter>
      <div id="body">
        <div id="versions-parent" className="body-part">
          <Versions />
        </div>
        <div id="surface-parent" className="body-part">
          <Surface />
        </div>
        <div id="profile-parent" className="body-part">
          <Profile />
        </div>
        <div id="start-parent" className="body-part">
          <Start />
        </div>
      </div>
    </HashRouter>
  );
}
