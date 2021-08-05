import React, { useState } from 'react';
import './OpeningScreen.scss';
import { Button, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import CryptoJS from 'crypto-js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
    },
    full: {
      width: '100%',
    },
  })
);

export default function OpeningScreen(): React.ReactElement {
  const { pwd, salt } = window.temp.accounts;
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | React.ReactElement>('');
  const submit = () => {
    if (CryptoJS.MD5(CryptoJS.SHA512(CryptoJS.SHA224(password + salt) + salt) + salt).toString() === pwd) {
      sessionStorage.tokenDecryptKey = CryptoJS.SHA224(CryptoJS.SHA384(password + salt) + salt).toString();
      location.reload();
    } else {
      setError(<FormattedMessage id="open.password.wrong" />);
    }
  };

  return (
    <div className="flex-center body-container">
      <Paper className={classes.main}>
        <Typography variant="h6">
          <FormattedMessage id="open.title" />
        </Typography>
        <div style={{ fontSize: 10 }}>
          <br />
        </div>
        <TextField
          type="password"
          label={<FormattedMessage id="open.password" />}
          className={classes.full}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          error={!!error}
          helperText={error}
          onInput={() => {
            setError('');
          }}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              submit();
            }
          }}
        />
        <div>
          <br />
        </div>
        <Button variant="contained" color="primary" className={classes.full} onClick={submit}>
          <FormattedMessage id="open.sign" />
        </Button>
      </Paper>
    </div>
  );
}
