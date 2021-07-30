import React, { useState } from 'react';
// eslint-disable-next-line import/namespace
import { WelcomeComponentProps } from './Welcome';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, TextField } from '@material-ui/core';
export default function PasswordSetter(props: WelcomeComponentProps): React.ReactElement {
  const [password, setPassword] = useState<string>();
  const [passwordRepeated, setPasswordRepeated] = useState<string>();
  const [error, setError] = useState<string>('');
  const intl = useIntl();

  const controlTextField = (func: typeof setPassword | typeof setPasswordRepeated) => {
    return function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      func(event.target.value);
    };
  };

  return (
    <div style={{ boxSizing: 'border-box', padding: 20 }}>
      <div style={{ boxSizing: 'border-box', margin: 20 }}>
        <div>
          <FormattedMessage id="welcome.password.subtitle.l1" />
        </div>
        <div>
          <FormattedMessage id="welcome.password.subtitle.l2" />
        </div>
        <div>
          <FormattedMessage id="welcome.password.subtitle.l3" />
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
            if (password === passwordRepeated) {
              localStorage.TEMP_password = password;
              props.setCompleted(3);
            } else {
              setError(intl.formatMessage({ id: 'welcome.password.pwd.different' }));
            }
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
}
