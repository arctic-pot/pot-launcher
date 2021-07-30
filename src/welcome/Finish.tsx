import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export default function Finish(): React.ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6">
        <FormattedMessage id="welcome.finish.text" />
      </Typography>
      <div>&nbsp;</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          localStorage.welcomed = 'true';
          location.reload();
        }}
      >
        &nbsp;&nbsp;
        <FormattedMessage id="welcome.finish.next" />
        &nbsp;&nbsp;
      </Button>
    </div>
  );
}
