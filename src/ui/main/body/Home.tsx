import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Popover,
} from '@material-ui/core';
import { BodyTabs, PropsReceiveTabState } from 'ui/main/Body';
import './Home.scss';
import ExternalLinkIcon from '@material-ui/icons/OpenInNewRounded';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import fs from 'fs-extra';
import path from 'path';
import OfflineAccountDialog from './newAccount/OfflineAccountDialog';
import { mergeMetadata } from 'utils/config';
import electron from 'electron';
import os from 'os';
import { IVersion, Version, IRule, sortVersions } from 'base/version/version';

enum AccountButtonState {
  hidden,
  popover,
  offline,
  microsoft,
  injector,
}

export interface IAccount {
  name: string;
  type: 'offline' | 'microsoft' | 'injector';
  clientToken?: string;
  accessTokenEncrypted?: string;
}

export default function Home(props: PropsReceiveTabState<unknown>): React.ReactElement {
  const { setOpeningTab } = props;
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [accountButtonState, setAccountButtonState] = useState(AccountButtonState.hidden);
  const [versionsList, setVersionsList] = useState<Version[]>();
  const [accountsList, setAccountsList] = useState<IAccount[]>(window.temp.accounts.accounts);
  const [selectedVersion, setSelectedVersion] = useState<IVersion>(JSON.parse(localStorage.selectedVersion || '{}'));
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(JSON.parse(localStorage.selectedAccount || '{}'));
  const accountButtonRef = useRef();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const isNotEmpty = (obj: object) => {
    return !!Object.keys(obj).length;
  };

  // manage versions list
  useEffect(() => {
    if (localStorage.gamePath) {
      const versionsDirectory = path.resolve(localStorage.gamePath, './versions');
      const versionDirectories = fs.readdirSync(versionsDirectory);
      setVersionsList(
        versionDirectories
          .map((version): Version => {
            const versionManifestPath = path.resolve(versionsDirectory, `./${version}/${version}.json`);
            return new Version(versionManifestPath);
          })
          .filter(isNotEmpty)
          .sort(sortVersions)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.selectedVersion = JSON.stringify(selectedVersion);
  }, [JSON.stringify(selectedVersion)]);

  useEffect(() => {
    localStorage.selectedAccount = JSON.stringify(selectedAccount);
  }, [JSON.stringify(selectedAccount)]);

  useEffect(() => {
    if (accountsList) {
      window.temp.accounts.accounts = accountsList;
      mergeMetadata({ accounts: accountsList });
    }
  }, [JSON.stringify(accountsList)]);

  const selectVersion = (version: IVersion) => {
    setSelectedVersion(version);
    setVersionDrawerOpen(false);
  };

  const osName = () => {
    const osType = os.type();
    switch (osType) {
      case 'Windows_NT':
        return 'windows';
      case 'Darwin':
        return 'osx';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const judgeRule = (rule: IRule) => {
    const isAllow = rule.action === 'allow';
    // os rules
    if (rule.os) {
      // actually the relationship between rules is 'and'
      // so we just find the rule that doesn't fit the actual

      let meetRule = true;
      if (rule.os.arch && rule.os.arch !== os.arch()) meetRule = false;
      if (rule.os.name && rule.os.name !== osName()) meetRule = false;
      if (rule.os.version && !RegExp(rule.os.version).test(os.release())) meetRule = false;
      return isAllow ? meetRule : !meetRule;
    } else if (rule.features) {
      let meetRule = false;
      if (rule.features.is_demo_user) meetRule = false;
      if (rule.features.has_custom_resolution) meetRule = false;
      return meetRule;
    }
  };

  const startGame = () => {
    // log the launch arguments
    const fixPath = (pathname: string) => {
      switch (os.type()) {
        case 'Windows_NT':
          return `"${pathname}"`;
        //case 'Darwin':
        //  return pathname.replace(/ /g, '" "');
        //case 'Linux':
        //  return pathname.replace(/\/.+( .+)+\//g, (word) => `'${word}'`);
        default:
          return pathname;
      }
    };
    const suffix = os.type() === 'Windows_NT' ? '.exe' : '';
    const java8Path = path.join(process.cwd(), './artifacts/jre8u302/bin/java' + suffix);
    const java16Path = path.join(process.cwd(), './artifacts/jre-16.0.2/bin/java' + suffix);
    const javaPath = fixPath(selectedVersion.javaVersion === 16 ? java16Path : java8Path);
    console.log(`Starting game with following arguments:\n\n%c${javaPath}`, 'font-weight: 600; color: #262626');
  };

  return (
    <div id="home">
      {localStorage.gamePath ? (
        <div id="home-background">
          <section id="home-version-list" className="home-paper-parent">
            <Paper>
              <List>
                <ListItem
                  button
                  onClick={() => {
                    setVersionDrawerOpen(true);
                  }}
                >
                  <ListItemText
                    primary={isNotEmpty(selectedVersion) ? selectedVersion.id : <FormattedMessage id="home.noVer" />}
                    secondary={
                      isNotEmpty(selectedVersion) ? (
                        selectedVersion.displayName
                      ) : (
                        <FormattedMessage id="home.chooseVer" />
                      )
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setAccountDrawerOpen(true);
                  }}
                >
                  <ListItemText
                    primary={
                      isNotEmpty(selectedAccount) ? selectedAccount.name : <FormattedMessage id="home.noAccount" />
                    }
                    secondary={
                      isNotEmpty(selectedAccount) ? (
                        <FormattedMessage id={`account.${selectedAccount.type}`} />
                      ) : (
                        <FormattedMessage id="home.chooseAccount" />
                      )
                    }
                  />
                </ListItem>
                <ListItem button disabled>
                  <ListItemText primary="0 mods enabled" secondary="NO FORGE OR FABRIC" />
                </ListItem>
                <Grow timeout={500} in>
                  <ListItem>
                    <Button
                      variant="contained"
                      style={{ width: '100%' }}
                      disabled={!(isNotEmpty(selectedVersion) && isNotEmpty(selectedAccount))}
                      onClick={startGame}
                    >
                      <FormattedMessage id="home.launch" />
                    </Button>
                  </ListItem>
                </Grow>
              </List>
            </Paper>

            <Drawer
              open={versionDrawerOpen}
              onClose={() => {
                setVersionDrawerOpen(false);
              }}
            >
              <List
                style={{
                  width: 415,
                }}
                subheader={
                  <ListSubheader className="home-subheader">
                    <FormattedMessage id="home.verList" />
                  </ListSubheader>
                }
              >
                {versionsList &&
                  versionsList.map((version) => (
                    <ListItem
                      button
                      key={version.id}
                      onClick={() => {
                        selectVersion(version);
                      }}
                    >
                      <ListItemText primary={version.id} secondary={version.displayName} />
                    </ListItem>
                  ))}
              </List>
            </Drawer>
            <Drawer
              open={accountDrawerOpen}
              onClose={() => {
                setAccountDrawerOpen(false);
              }}
            >
              <List
                style={{
                  width: 415,
                  height: 480,
                  overflow: 'auto',
                }}
                subheader={
                  <ListSubheader className="home-subheader">
                    <FormattedMessage id="home.accountList" />
                  </ListSubheader>
                }
              >
                {accountsList
                  ? accountsList.filter(Boolean).map((account: IAccount) => {
                      return (
                        <ListItem
                          key={account.name}
                          button
                          onClick={() => {
                            setSelectedAccount(account);
                            setAccountDrawerOpen(false);
                          }}
                        >
                          <ListItemText
                            primary={account.name}
                            secondary={<FormattedMessage id={`account.${account.type}`} />}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => {
                                const index = accountsList.findIndex(
                                  (acc) => acc.type === account.type && acc.name === account.name
                                );
                                delete accountsList[index];
                                setAccountsList(accountsList.filter(Boolean));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })
                  : ''}
              </List>
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
                  <ListItem button disabled>
                    <ListItemText
                      primary={<FormattedMessage id="account.microsoft" />}
                      secondary={<FormattedMessage id="account.microsoft.desc" />}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      setAccountButtonState(AccountButtonState.offline);
                    }}
                  >
                    <ListItemText
                      primary={<FormattedMessage id="account.offline" />}
                      secondary={<FormattedMessage id="account.offline.desc" />}
                    />
                  </ListItem>
                  <ListItem button disabled>
                    <ListItemText
                      primary={<FormattedMessage id="account.injector" />}
                      secondary={<FormattedMessage id="account.injector.desc" />}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      setAccountButtonState(AccountButtonState.hidden);
                      electron.shell.openExternal('https://www.minecraft.net/store/minecraft-java-edition').then();
                    }}
                  >
                    <ListItemIcon>
                      <ExternalLinkIcon />
                    </ListItemIcon>
                    <ListItemText primary={<FormattedMessage id="home.buyAccount" />} />
                  </ListItem>
                </List>
              </Popover>
              <OfflineAccountDialog
                open={accountButtonState === AccountButtonState.offline}
                onClose={() => {
                  setAccountButtonState(AccountButtonState.hidden);
                }}
              />
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
            </Drawer>
          </section>
          {/*
          </section>*/}
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
