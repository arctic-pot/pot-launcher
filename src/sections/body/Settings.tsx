import React, { useEffect, useReducer, useState } from 'react';
import './Home.scss';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  createStyles,
  ListItemText,
  Select,
  MenuItem,
  Switch,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

const useStyles = makeStyles(() =>
  createStyles({
    containerRoot: {},
    container: {
      width: 600,
      height: 444,
      overflow: 'auto',
      boxSizing: 'border-box',
      padding: 5,
    },
    list: {
      width: 584,
    },
  })
);

export enum SettingsAccordion {
  general,
}

export enum Alert {
  no,
  reset,
}

export default function Settings(): React.ReactElement {
  const classes = useStyles();
  const [alert, setAlert] = useState(Alert.no);
  const [settings, mergeSettings] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any, action: any) => {
      return { ...state, ...action };
    },
    {
      lang: localStorage.locale,
      gamePath: localStorage.gamePath,
      rpc: !!localStorage.rpc,
      rpcPort: localStorage.rpcPort ?? 6800,
      downThreads: localStorage.downThreads ?? 1,
    }
  );

  const saveSettings = () => {
    localStorage.locale = settings.lang;
    localStorage.gamePath = settings.gamePath ?? '';
    localStorage.rpc = settings.rpc ? 'true' : '';
    localStorage.rpcPort = settings.rpcPort;
    localStorage.downThreads = settings.downThreads;
  };

  useEffect(saveSettings, [JSON.stringify(settings)]);

  const selectChangeHandler = (keyName: string) => {
    return function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
      mergeSettings({ [keyName]: (event.target as HTMLInputElement).value });
    };
  };

  const switchChangeBoolHandler = (keyName: string) => {
    return function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
      mergeSettings({ [keyName]: (event.target as HTMLInputElement).checked });
    };
  };

  const textFieldHandler = (keyName: string) => {
    return function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
      mergeSettings({ [keyName]: (event.target as HTMLInputElement).value });
    };
  };

  return (
    <Container className={classes.containerRoot}>
      <Container className={classNames(classes.container, 'scrollbar-thin')}>
        <Accordion>
          <AccordionSummary>
            <FormattedMessage id="settings.general" />
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary={<FormattedMessage id="settings.general.lang" />} />
                <ListItemSecondaryAction>
                  <Select value={settings.lang} onChange={selectChangeHandler('lang')}>
                    <MenuItem value="zh-CN">中文（中国）</MenuItem>
                    <MenuItem value="en-US">English (US)</MenuItem>
                  </Select>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary={<FormattedMessage id="settings.general.useRPC" />} />
                <ListItemSecondaryAction>
                  <Switch color="primary" onChange={switchChangeBoolHandler('rpc')} checked={settings.rpc} />
                </ListItemSecondaryAction>
              </ListItem>
              {settings.rpc ? (
                <ListItem>
                  <ListItemText primary={<FormattedMessage id="settings.general.RPCPort" />} />
                  <ListItemSecondaryAction>
                    <TextField
                      value={settings.rpcPort}
                      style={{ width: 75 }}
                      type="number"
                      onChange={textFieldHandler('rpcPort')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText primary={<FormattedMessage id="settings.general.downThreads" />} />
                  <ListItemSecondaryAction>
                    <TextField
                      value={settings.downThreads}
                      style={{ width: 75 }}
                      type="number"
                      onChange={(event) => {
                        const value = parseInt((event.target as HTMLInputElement).value);
                        if (isNaN(value)) {
                          mergeSettings({ downThreads: 1 });
                        } else if (value > 64) {
                          mergeSettings({ downThreads: 64 });
                        } else if (value === 0) {
                          mergeSettings({ downThreads: 1 });
                        } else {
                          mergeSettings({ downThreads: Math.abs(value) });
                        }
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <FormattedMessage id="settings.custom" />
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary={<FormattedMessage id="settings.custom.palette" />} />
                <ListItemSecondaryAction>
                  <Select value={'blue'} disabled>
                    <MenuItem value="blue">Blue (Default)</MenuItem>
                  </Select>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <FormattedMessage id="settings.game" />
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              <ListItem>
                <ListItemText
                  primary={<FormattedMessage id="settings.game.path" />}
                  secondary={settings.gamePath || <FormattedMessage id="settings.game.path.no" />}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      //electron.remote.dialog.showSaveDialogSync({});
                      return;
                    }}
                  >
                    Choose
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary={<FormattedMessage id="settings.game.autoVersionName" />} />
                <ListItemSecondaryAction>
                  <Switch color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <FormattedMessage id="settings.secret" />
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                const root = document.getElementById('root');
                if (root.classList.length <= 0) {
                  const classToken =
                    'egg-' +
                    ['blur', 'invert', 'gray', 'hue', 'opacity', 'sepia', 'font', 'wtf'][~~(Math.random() * 8)];
                  setTimeout(() => root.classList.add(classToken), 100);
                }
              }}
            >
              <FormattedMessage id="settings.secret.noClick" />
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <FormattedMessage id="settings.recovery" />
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.list}>
              <ListItem>
                <ListItemText
                  primary={<FormattedMessage id="settings.recovery.reset" />}
                  secondary={<FormattedMessage id="settings.recovery.reset.desc" />}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setAlert(Alert.reset);
                    }}
                  >
                    <FormattedMessage id="settings.recovery.reset.do" />
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Dialog open={alert === Alert.reset} onClose={() => setAlert(Alert.no)}>
          <DialogTitle>
            <FormattedMessage id="settings.alert.reset.title" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage id="settings.alert.reset.content" />
            </DialogContentText>
            <DialogActions>
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  setAlert(Alert.no);
                }}
              >
                <FormattedMessage id="alert.cancel" />
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  location.reload();
                }}
              >
                <FormattedMessage id="alert.continue" />
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Container>
    </Container>
  );
}
