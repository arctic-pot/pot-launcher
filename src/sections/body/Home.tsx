import React from 'react';
import './Home.scss';
import { FormattedMessage } from 'react-intl';
import { Button, Paper } from '@material-ui/core';
import { BodyTabs, PropsReceiveTabState } from '../Body';

export default function Home(props: PropsReceiveTabState<unknown>): React.ReactElement {
  const { setOpeningTab } = props;
  return (
    <div id="home">
      {localStorage.gamePath ? (
        <Paper>
          <section id="home-version-list">a</section>
        </Paper>
      ) : (
        <div className="not-available-fallback">
          <FormattedMessage id="home.noPath" />
          <div>
            <br />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpeningTab(BodyTabs.settings);
            }}
          >
            <FormattedMessage id="settings.goto" />
          </Button>
        </div>
      )}
    </div>
  );
}
