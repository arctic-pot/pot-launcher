import React, { useState } from 'react';
import './Profile.scss';
import profileFallback from '../../assets/img/profile-fallback.svg';
import { FormattedMessage } from 'react-intl';

export default function Profile(): React.ReactElement {
  type AccountTypes = 'no' | 'microsoft' | 'mojang' | 'offline' | 'authlib';
  const [accountType /*setAccountType*/] = useState<AccountTypes>('no');
  const [accountName /*setAccountName*/] = useState<string>('Guest');
  return (
    <>
      <img alt="" src={profileFallback} id="profile-img" />
      <div id="profile-info">
        <div id="profile-name">{accountName}</div>
        <div id="profile-type">
          {
            // This code has a behavior like switch statement
            {
              no: <FormattedMessage id="account.no" />,
              microsoft: <FormattedMessage id="account.microsoft" />,
              mojang: <FormattedMessage id="account.mojang" />,
              offline: <FormattedMessage id="account.offline" />,
              authlib: <FormattedMessage id="account.authlib" />,
            }[accountType]
          }
        </div>
      </div>
    </>
  );
}
