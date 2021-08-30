import React from 'react';
// eslint-disable-next-line import/namespace
import { WelcomeComponentProps } from './Welcome';
import { ButtonBase, Grid, Paper } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import path from 'path';
import os from 'os';
export default function PathSelector(props: WelcomeComponentProps): React.ReactElement {
  return (
    <div style={{ boxSizing: 'border-box', padding: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>
            <ButtonBase
              className="lang-button"
              disabled={os.type() !== 'Windows_NT'}
              onClick={() => {
                // We make sure it's windows.
                localStorage.gamePath = path.resolve(process.env.APPDATA, './.minecraft');
                props.setCompleted(2);
              }}
            >
              <FormattedMessage id="welcome.path.official" />
            </ButtonBase>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '5px 0' }}>
          or
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <ButtonBase
              className="lang-button"
              onClick={() => {
                props.setCompleted(1);
              }}
            >
              <FormattedMessage id="welcome.path.unofficial" />
            </ButtonBase>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
