import React from 'react';
import TitleBar from './components/TitleBar';
import Body from './components/Body';
export default function App(): React.ReactElement {
  return (
    // region public states

    // endregion

    <>
      <TitleBar />
      <Body />
    </>
  );
}
