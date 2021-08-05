import React, { useState } from 'react';
import { DialogProps as Props } from './types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { mergeMetadata } from 'utils/config';
import { v4 as UUID4 } from 'uuid';

export default function OfflineAccountDialog(props: Props): React.ReactElement {
  const [error, setError] = useState<string | React.ReactElement>('');
  const [name, setName] = useState('');
  const accounts = window.temp.accounts.accounts;

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <FormattedMessage id="account.offline.create" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="account.offline.create.desc" />
        </DialogContentText>
        <TextField
          label={<FormattedMessage id="account.username" />}
          error={!!error}
          helperText={error}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setName(value);
            if (
              !value.match(/^[a-zA-Z0-9_]{1,15}$/) ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              accounts.find((account: any) => account.type === 'offline' && account.name === value)
            ) {
              setError(<FormattedMessage id="account.username.illegal" />);
            } else {
              setError('');
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          <FormattedMessage id="account.cancel" />
        </Button>
        <Button
          color="primary"
          onClick={() => {
            accounts.push({
              type: 'offline',
              name: name,
              uuid: UUID4(),
            });
            mergeMetadata({
              accounts,
            });
            props.onClose();
          }}
        >
          <FormattedMessage id="account.create" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
