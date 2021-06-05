import React from 'react';
import './Body.scss';
import Profile from './Profile';
import Start from './Start';

export default function Body(): React.ReactElement {
  return (
    <div id="body">
      <div id="versions-parent" className="body-part">
        Installed Versions
      </div>
      <div id="background-parent" className="body-part">
        An image
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
