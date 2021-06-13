import React from 'react';
import './Body.scss';
import Surface from './Surface';
import Profile from './Profile';
import Start from './Start';

export default function Body(): React.ReactElement {
  return (
    <div id="body">
      <div id="versions-parent" className="body-part">
        Installed Versions
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
  );
}
