import React from 'react';
import TitleBar from './components/TitleBar';
import Body from './components/Body';
import Welcome from './welcome/Welcome';

export interface IAppProps {
  welcome?: boolean;
  strings?: Record<string, string>
}

export default function App(props: IAppProps): React.ReactElement {
  // region public states

  // endregion

  const welcome = !!props.welcome;

  return (
    <>
      <TitleBar />
      {welcome ? <Welcome /> : <Body />}
    </>
  );
}
