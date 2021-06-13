import React, { useEffect } from 'react';
import TitleBar from './components/TitleBar';
import Body from './components/Body';
import Welcome from './welcome/Welcome';
import { IntlProvider } from 'react-intl';

export interface IAppProps {
  welcome?: boolean;
  strings?: Record<string, string>;
}

export default function App(props: IAppProps): React.ReactElement {
  // region public states

  // endregion

  const welcome = !!props.welcome;
  const { strings } = props;
  const { locale } = localStorage;
  console.log(strings);

  useEffect(() => {
    // Set lang attribute if locale was configured
    locale && (document.getElementById('root').lang = locale);
  }, []);

  return (
    <IntlProvider locale={locale} messages={strings} defaultLocale="zh-CN">
      <TitleBar />
      {welcome ? <Welcome /> : <Body />}
    </IntlProvider>
  );
}
