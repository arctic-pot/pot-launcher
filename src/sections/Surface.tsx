import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './Surface.scss';
import { FormattedMessage } from 'react-intl';
import Home from './secondary/Home';
import Download from './secondary/Download';
import Account from './secondary/Account';
import Settings from './secondary/Settings';
import About from './secondary/About';

export enum SurfaceApps {
  home,
  download,
  social,
  server,
  nat,
  about,
  settings,
}

export default function Surface(): React.ReactElement {
  interface SurfaceButtonProps {
    iconName?: string;
    text: string;
    pinned?: boolean;
    appId: number;
    appPath: string;
  }

  function SurfaceButton(props: SurfaceButtonProps) {
    return (
      <Link to={props.appPath} style={{ color: '#000' }}>
        <div className="surface-button">
          <div className="surface-button-icon">
            <i className={props.iconName} />
          </div>
          <div className="surface-button-text">
            <FormattedMessage id={props.text} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <nav id="surface-nav">
        <SurfaceButton appPath="/" appId={SurfaceApps.home} text="home.title" iconName="bi-house" />
        <SurfaceButton appPath="/download" appId={SurfaceApps.download} text="download.title" iconName="bi-download" />
        <SurfaceButton appPath="/account" appId={SurfaceApps.social} text="profile.title" iconName="bi-person" />
        <SurfaceButton appPath="/server" appId={SurfaceApps.server} text="server.title" iconName="bi-hdd" />
        <SurfaceButton appPath="/nat" appId={SurfaceApps.nat} text="nat.title" iconName="bi-hdd-network" />
        <SurfaceButton appPath="/about" appId={SurfaceApps.about} text="about.title" iconName="bi-three-dots" />
        <SurfaceButton appPath="/settings" appId={SurfaceApps.settings} text="settings.title" iconName="bi-gear" />
      </nav>
      <section id="surface-app">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/download" exact>
            <Download />
          </Route>
          <Route path="/account" exact>
            <Account />
          </Route>
          <Route path="/server" exact>
            -
          </Route>
          <Route path="/nat" exact>
            -
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
        </Switch>
      </section>
    </>
  );
}
