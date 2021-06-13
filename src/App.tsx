import React from 'react';
import TitleBar from './components/TitleBar';
import Body from './components/Body';
import Welcome from './welcome/Welcome';
import { IntlProvider } from 'react-intl';

export interface IAppProps {
  welcome?: boolean;
  strings?: Record<string, string>
}

export default function App(props: IAppProps): React.ReactElement {
  // region public states

  // endregion

  const welcome = !!props.welcome;
  const { strings } = props;
  console.log(strings)

  return (
    <IntlProvider locale={localStorage.locale} messages={strings}>
      <TitleBar />
      {welcome ? <Welcome /> : <Body />}
    </IntlProvider>
  );
}
