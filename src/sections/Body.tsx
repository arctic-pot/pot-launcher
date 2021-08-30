import React, { useEffect, useState } from 'react';
import { Fade, Tab, Tabs } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import './Body.scss';
import Home from './body/Home';
import Settings from './body/Settings';
import classNames from 'classnames';
import { SnackbarProvider } from 'notistack';

export type PropsReceiveTabState<T> = T & {
  openingTab: number;
  setOpeningTab: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
};

export enum BodyTabs {
  home,
  download,
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

  interface ITabPageProps {
    value: number;
    children: React.ReactElement;
  }

  const TabPage = (props: ITabPageProps) => {
    const { value, children } = props;
    return (
      <Fade in={openingTab === value} timeout={500}>
        <div className={classNames('tab-page')} hidden={openingTab !== value}>
          {children}
        </div>
      </Fade>
    );
  };

  useEffect(() => {
    sessionStorage.tab = openingTab;
  }, [openingTab]);

  return (
    <SnackbarProvider maxSnack={3}>
      <div id="body">
        <nav>
          <Tabs centered value={openingTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label={<FormattedMessage id="home.title" />} />
            <Tab label={<FormattedMessage id="down.title" />} />
            <Tab label={<FormattedMessage id="tool.title" />} />
            <Tab label={<FormattedMessage id="mods.title" />} />
            <Tab label={<FormattedMessage id="settings.title" />} />
          </Tabs>
        </nav>
        <main>
          <TabPage value={BodyTabs.home}>
            <Home {...tabProps} />
          </TabPage>
          <TabPage value={BodyTabs.settings}>
            <Settings />
          </TabPage>
        </main>
      </div>
    </SnackbarProvider>
  );
}
