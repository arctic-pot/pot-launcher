import React from 'react';
import './Profile.scss';
import profileFallback from '../../assets/img/profile-fallback.svg';

export default function Profile(): React.ReactElement {
  return (
    <>
      <img alt="" src={profileFallback} id="profile-img" />
      <div id="profile-info">
        <div id="profile-name">Guest</div>
        <div id="profile-type">No account created</div>
      </div>
    </>
  );
}
