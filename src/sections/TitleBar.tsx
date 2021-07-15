import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, createStyles, IconButton, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseRounded';
import MinimizeIcon from '@material-ui/icons/RemoveRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import './TitleBar.scss';
import info from 'assets/versionList.json';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function (): React.ReactElement {
  const classes = useStyles();
  const { ipcRenderer } = window;
  return (
    <>
      <AppBar position="static" className="title-bar">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            {/* if version more than 1, show roman version, if in beta, show "BETA" */}
            {/* whitespaces that more than 1 will be zip to 1 in browser */}
            Pot Minecraft Launcher {info.versionMajor > 1 && info.versionRoman} {info.beta && 'BETA'}
          </Typography>
          <Tooltip title={<FormattedMessage id="title.reload" defaultMessage="Reload" />}>
            <IconButton
              color="inherit"
              className="title-bar-action"
              onClick={() => {
                window.public.saveSettings();
                location.reload();
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<FormattedMessage id="title.minimize" defaultMessage="Minimize" />}>
            <IconButton
              color="inherit"
              className="title-bar-action"
              id="minimize-button"
              onClick={() => ipcRenderer.send('minimize')}
            >
              <MinimizeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={<FormattedMessage id="title.close" defaultMessage="Close" />}>
            <IconButton
              color="inherit"
              className="title-bar-action"
              id="close-button"
              onClick={() => ipcRenderer.send('destroy')}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
}
