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

  function Pivot(props: SurfaceButtonProps) {
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
        <Pivot appPath="/" appId={SurfaceApps.home} text="home.title" iconName="bi-house" />
        <Pivot appPath="/download" appId={SurfaceApps.download} text="download.title" iconName="bi-download" />
        <Pivot appPath="/account" appId={SurfaceApps.social} text="profile.title" iconName="bi-person" />
        <Pivot appPath="/server" appId={SurfaceApps.server} text="server.title" iconName="bi-hdd" />
        <Pivot appPath="/nat" appId={SurfaceApps.nat} text="nat.title" iconName="bi-hdd-network" />
        <Pivot appPath="/about" appId={SurfaceApps.about} text="about.title" iconName="bi-three-dots" />
        <Pivot appPath="/settings" appId={SurfaceApps.settings} text="settings.title" iconName="bi-gear" />
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
