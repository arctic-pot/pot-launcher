import React, { useContext } from 'react';
import './Profile.scss';
import profileFallback from 'assets/img/profile-fallback.svg';
import { FormattedMessage } from 'react-intl';
import { PublicStates } from '../App';

export default function Profile(): React.ReactElement {
  const { accountName, accountType } = useContext(PublicStates);

  return (
    <>
      <img alt="" src={profileFallback} id="profile-img" />
      <div id="profile-info">
        <div id="profile-name">{accountName}</div>
        <div id="profile-type">
          {
            // This code has a behavior like switch statement
            [
              <FormattedMessage id="account.no" />,
              <FormattedMessage id="account.microsoft" />,
              <FormattedMessage id="account.mojang" />,
              <FormattedMessage id="account.offline" />,
              <FormattedMessage id="account.authlib" />,
            ][accountType as number]
          }
        </div>
      </div>
    </>
  );
}
