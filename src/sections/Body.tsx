import React from 'react';
import './Body.scss';
import Surface from './Surface';
import Profile from './Profile';
import Start from './Start';
import Versions from './Versions';
import { HashRouter, Link } from 'react-router-dom';

export default function Body(): React.ReactElement {
  return (
    <HashRouter>
      <main id="body">
        <div id="versions-parent" className="body-part">
          <Versions />
        </div>
        <div id="surface-parent" className="body-part">
          <Surface />
        </div>
        <Link to="/account">
          <div id="profile-parent" className="body-part">
            <Profile />
          </div>
        </Link>
        <div id="start-parent" className="body-part">
          <Start />
        </div>
      </main>
    </HashRouter>
  );
}