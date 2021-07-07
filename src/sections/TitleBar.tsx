import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, createStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseRounded';
import MinimizeIcon from '@material-ui/icons/RemoveRounded';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import './Body.scss';
import info from 'assets/versionList.json';

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
  return (
    <>
      <AppBar position="static" className="title-bar">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            {/* if version more than 1, show roman version, if in beta, show "BETA" */}
            {/* whitespaces that more than 1 will be zip to 1 in browser */}
            Pot Minecraft Launcher {info.versionMajor > 1 && info.versionRoman} {info.beta && 'BETA'}
          </Typography>
          <IconButton color="inherit" className="title-bar-action" onClick={() => location.reload()}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="inherit" className="title-bar-action" id="minimize-button">
            <MinimizeIcon />
          </IconButton>
          <IconButton color="inherit" className="title-bar-action" id="close-button">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
