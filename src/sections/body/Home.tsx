import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Popover } from '@material-ui/core';
import { BodyTabs, PropsReceiveTabState } from '../Body';
import './Home.scss';
import ExternalLinkIcon from '@material-ui/icons/OpenInNewRounded';
import fs from 'graceful-fs';
import path from 'path';

enum AccountButtonState {
  hidden,
  popover,
  offline,
  microsoft,
  injector,
}

interface InstalledVersion {
  displayName: string;
}

export default function Home(props: PropsReceiveTabState<unknown>): React.ReactElement {
  const { setOpeningTab } = props;
  const [accountButtonState, setAccountButtonState] = useState(AccountButtonState.hidden);
  const [versionsList, setVersionsList] = useState<InstalledVersion[]>();
  const accountButtonRef = useRef();

  // manage versions list
  useEffect(() => {
    const versionDirectories = fs.readdirSync(path.resolve(localStorage.gamePath, './versions'));
    setVersionsList(
      versionDirectories
        .map((version) => {
          return { displayName: version };
        })
        .sort()
        .reverse()
    );
  }, []);

  return (
    <div id="home">
      {localStorage.gamePath ? (
        <div id="home-background">
          <section id="home-version-list" className="home-paper-parent">
            <Paper className="home-scrollable scrollbar-hidden">
              <List
                subheader={
                  <ListSubheader className="home-subheader">
                    <FormattedMessage id="home.verList" />
                  </ListSubheader>
                }
              >
                {versionsList &&
                  versionsList.map((version) => (
                    <ListItem button key={version.displayName}>
                      <ListItemText primary={version.displayName} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </section>
          <section id="home-account-list" className="home-paper-parent">
            <Popover
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              anchorEl={accountButtonRef.current}
              open={accountButtonState === AccountButtonState.popover}
              onClose={() => setAccountButtonState(AccountButtonState.hidden)}
            >
              <List>
                <ListItem button>
                  <ListItemText
                    primary={<FormattedMessage id="account.microsoft" />}
                    secondary={<FormattedMessage id="account.microsoft.desc" />}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={<FormattedMessage id="account.offline" />}
                    secondary={<FormattedMessage id="account.offline.desc" />}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={<FormattedMessage id="account.injector" />}
                    secondary={<FormattedMessage id="account.injector.desc" />}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setAccountButtonState(AccountButtonState.hidden);
                    window.electron.shell.openExternal('https://www.minecraft.net/store/minecraft-java-edition');
                  }}
                >
                  <ListItemIcon>
                    <ExternalLinkIcon />
                  </ListItemIcon>
                  <ListItemText primary={<FormattedMessage id="home.buyAccount" />} />
                </ListItem>
              </List>
            </Popover>
            <Paper>
              <div className="home-list">a</div>
              <div className="home-button" ref={accountButtonRef}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setAccountButtonState(AccountButtonState.popover);
                  }}
                >
                  <FormattedMessage id="home.newAccount" />
                </Button>
              </div>
            </Paper>
          </section>
          <section id="home-version-list" className="home-paper-parent">
            <Paper>Start game</Paper>
          </section>
        </div>
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
