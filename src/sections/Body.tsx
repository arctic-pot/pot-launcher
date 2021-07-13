import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import './Body.scss';
import Home from './body/Home';
import Settings from './body/Settings';

export type PropsReceiveTabState<T> = T & {
  openingTab: number;
  setOpeningTab: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
};

export enum BodyTabs {
  home,
  server,
  tool,
  mods,
  settings,
}

export default function (): React.ReactElement {
  const [openingTab, setOpeningTab] = useState(parseInt(sessionStorage.tab) || BodyTabs.home);
  const tabProps = { openingTab, setOpeningTab };
  const handleChange = (e: React.ChangeEvent<unknown>, newValue: number) => {
    setOpeningTab(newValue);
  };

  useEffect(() => {
    sessionStorage.tab = openingTab;
  }, [openingTab]);

  return (
    <div id="body">
      <nav>
        <Tabs centered value={openingTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label={<FormattedMessage id="home.title" />} />
          <Tab label={<FormattedMessage id="server.title" />} />
          <Tab label={<FormattedMessage id="tool.title" />} />
          <Tab label={<FormattedMessage id="mods.title" />} />
          <Tab label={<FormattedMessage id="settings.title" />} />
        </Tabs>
      </nav>
      <main>
        {
          // A Switcher
          [<Home {...tabProps} />, <></>, <></>, <></>, <Settings />][openingTab]
        }
      </main>
    </div>
  );
}
