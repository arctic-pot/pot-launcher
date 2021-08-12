import React, { useState } from 'react';
// eslint-disable-next-line import/namespace
import { WelcomeComponentProps } from './Welcome';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
import { mergeMetadata } from 'utils/config';
import CryptoJS from 'crypto-js';

export default function PasswordSetter(props: WelcomeComponentProps): React.ReactElement {
  const [password, setPassword] = useState<string>();
  const [passwordRepeated, setPasswordRepeated] = useState<string>();
  const [error, setError] = useState<string>('');
  const salt = window.temp.accounts.salt;
  const intl = useIntl();

  const controlTextField = (func: typeof setPassword | typeof setPasswordRepeated) => {
    return function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      func(event.target.value);
      setError('');
    };
  };

  return (
    <div>
      <div style={{ boxSizing: 'border-box', margin: 20 }}>
        <div>
          <FormattedMessage id="welcome.password.subtitle.l1" />
        </div>
        <div>
          <FormattedMessage id="welcome.password.subtitle.l2" />
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', margin: 20 }}>
        <div>
          <TextField
            label={<FormattedMessage id="welcome.password.pwd" />}
            type="password"
            style={{ width: 400 }}
            onChange={controlTextField(setPassword)}
            error={!!error}
            helperText={error}
          />
        </div>
        <div>&nbsp;</div>
        <div>
          <TextField
            label={<FormattedMessage id="welcome.password.pwd.check" />}
            type="password"
            style={{ width: 400 }}
            onChange={controlTextField(setPasswordRepeated)}
            error={!!error}
            helperText={error}
          />
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', margin: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // check password same
            if (password.length > 0) {
              if (password === passwordRepeated) {
                mergeMetadata({
                  pwd: CryptoJS.MD5(CryptoJS.SHA512(CryptoJS.SHA224(password + salt) + salt) + salt).toString(),
                });
                props.setCompleted(1);
              } else {
                setError(intl.formatMessage({ id: 'welcome.password.pwd.different' }));
              }
            }
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
}
