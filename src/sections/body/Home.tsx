import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import { BodyTabs, PropsReceiveTabState } from '../Body';
import './Home.scss';
//import ExternalLinkIcon from '@material-ui/icons/OpenInNewRounded';
import fs from 'graceful-fs';
import path from 'path';

//enum AccountButtonState {
//  hidden,
//  popover,
//  offline,
//  microsoft,
//  injector,
//}

interface InstalledVersion {
  displayName: string;
  id: string;
  displayId: string;
  snapshot: boolean;
}

interface VersionPatch extends Record<string, unknown> {
  id: string;
  version: string;
}

export default function Home(props: PropsReceiveTabState<unknown>): React.ReactElement {
  const { setOpeningTab } = props;
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  //const [accountButtonState, setAccountButtonState] = useState(AccountButtonState.hidden);
  const [versionsList, setVersionsList] = useState<InstalledVersion[]>();
  const [selectedVersion, setSelectedVersion] = useState<InstalledVersion>(
    JSON.parse(localStorage.selectedVersion || '{}')
  );
  //const accountButtonRef = useRef();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const isEmpty = (obj: object) => {
    return !!Object.keys(obj).length;
  };

  // manage versions list
  useEffect(() => {
    const versionsDirectory = path.resolve(localStorage.gamePath, './versions');
    const versionDirectories = fs.readdirSync(versionsDirectory);
    setVersionsList(
      versionDirectories
        .map((version) => {
          const _versionManifestPath = path.resolve(versionsDirectory, `./${version}/${version}.json`);
          const manifest = JSON.parse(fs.readFileSync(_versionManifestPath).toString());
          const patches = manifest.patches;
          const versionId = patches.find((patch: VersionPatch) => patch.id === 'game').version;
          const isSnapshot = manifest.type === 'snapshot';
          // region get forge, fabric, optifine, and display version
          /*************************************************/
          /*               ===  WARNING  ===               */
          /*   The following code is hard to read and no   */
          /*   any comments. Hide these code is better.    */
          /*************************************************/
          const fabricInfo = patches.find((patch: VersionPatch) => patch.id === 'fabric');
          const fabricExist = !!fabricInfo;
          const fabricVersion = fabricExist ? fabricInfo.version : null;
          const forgeInfo = patches.find((patch: VersionPatch) => patch.id === 'forge');
          const forgeExist = !!forgeInfo;
          const forgeVersion = forgeExist ? forgeInfo.version : null;
          const optifineInfo = patches.find((patch: VersionPatch) => patch.id === 'optifine');
          const optifineExist = !!optifineInfo;
          const optifineVersion = optifineExist ? optifineInfo.version : null;
          const displayId =
            versionId +
            (optifineExist ? `, Optifine ${optifineVersion}` : '') +
            (forgeExist ? `, Forge ${forgeVersion}` : '') +
            (fabricExist ? `, Fabric ${fabricVersion}` : '');
          // endregion

          return {
            displayName: version,
            id: versionId,
            displayId: displayId,
            snapshot: isSnapshot,
            assets: manifest.assets,
          };
        })
        .sort((ver1, ver2) => {
          // in Minecraft, major version is always 1.
          // snapshot version and April Fool version should compare them specially
          const ver1Id = ver1.snapshot ? ver1.assets + '.-1' : ver1.id;
          const ver2Id = ver2.snapshot ? ver2.assets + '.-1' : ver2.id;
          const [, ver1Minor, _ver1Patch] = ver1Id.split('.').map((num: string) => parseInt(num));
          const [, ver2Minor, _ver2Patch] = ver2Id.split('.').map((num: string) => parseInt(num));
          // in some cases, the version id doesn't has a patch version, e.g. 1.17.
          // it must be a complete version id to compare
          const ver1Patch = _ver1Patch ?? 0;
          const ver2Patch = _ver2Patch ?? 0;
          if (ver1Minor > ver2Minor) return -1;
          if (ver1Minor < ver2Minor) return 1;
          if (ver1Patch > ver2Patch) return -1;
          if (ver1Patch < ver2Patch) return 1;
          return 0;
        })
    );
  }, []);

  useEffect(() => {
    localStorage.selectedVersion = JSON.stringify(selectedVersion);
  }, [selectedVersion]);

  const selectVersion = (version: InstalledVersion) => {
    setSelectedVersion(version);
    setVersionDrawerOpen(false);
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
                    primary={
                      isEmpty(selectedVersion) ? selectedVersion.displayName : <FormattedMessage id="home.noVer" />
                    }
                    secondary={
                      isEmpty(selectedVersion) ? selectedVersion.displayId : <FormattedMessage id="home.chooseVer" />
                    }
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="TODO" secondary="This feature is not completed!" />
                </ListItem>
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
                      key={version.displayName}
                      onClick={() => {
                        selectVersion(version);
                      }}
                    >
                      <ListItemText primary={version.displayName} secondary={version.displayId} />
                    </ListItem>
                  ))}
              </List>
            </Drawer>
          </section>
          {/*
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
