import React, { useState } from 'react';
import './Account.scss';
import { FormattedMessage } from 'react-intl';
import { Button, TextField } from '@material-ui/core';

export default function Account(): React.ReactElement {
  enum AccountCreatePage {
    chooseType,
    ms,
    mojang,
    offline,
    injector,
  }
  const [accountCreatePage, setAccountCreatePage] = useState<AccountCreatePage>(AccountCreatePage.chooseType);

  // region create account steps
  const ChooseAccountType = () => {
    const pageSetter = (page: AccountCreatePage): React.EventHandler<React.MouseEvent> => {
      return () => {
        setAccountCreatePage(page);
      };
    };

    return (
      <>
        {accountCreatePage === AccountCreatePage.chooseType && (
          <div id="account-create-choose-type-container" className="">
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.mojang)}>
              <FormattedMessage id="account.mojang" />
            </Button>
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.ms)}>
              <FormattedMessage id="account.microsoft" />
            </Button>
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.offline)}>
              <FormattedMessage id="account.offline" />
            </Button>
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.injector)}>
              <FormattedMessage id="account.authlib" />
            </Button>
          </div>
        )}
        {accountCreatePage === AccountCreatePage.mojang && (
          <div id="account-create-choose-type-container" className="">
            <h1>
              <FormattedMessage id="account.mojang" />
            </h1>
            <TextField placeholder="Email" label="Email" />
            <TextField placeholder="Password" type="password" label="Password" />
            <br />
            <Button variant="contained" color="primary">Login</Button>
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.chooseType)}>Cancel</Button>
          </div>
        )}
        {accountCreatePage === AccountCreatePage.ms && (
          <div id="account-create-choose-type-container" className="">
            <div>We are going to open a new window to let you sign</div>
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.chooseType)}>Cancel</Button>
          </div>
        )}
        {accountCreatePage === AccountCreatePage.offline && (
          <div id="account-create-choose-type-container" className="">
            <TextField label="Name" placeholder="Name" />
            <br />
            <Button variant="outlined" onClick={pageSetter(AccountCreatePage.chooseType)}>Cancel</Button>
          </div>
        )}
      </>
    );
  };
  // endregion

  return (
    <div id="page-account">
      <div id="account-list">No Account</div>
      <div id="account-create">
        <ChooseAccountType />
      </div>
    </div>
  );
}
