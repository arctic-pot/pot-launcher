import React, { useState } from 'react';
import './Welcome.scss';
import { createStyles, Grow, makeStyles, Paper, Step, StepLabel, Stepper, Theme } from '@material-ui/core';
import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';
import { FormattedMessage, IntlProvider } from 'react-intl';
//import LangChooser from './LangChooser';
//import PathSelector from './PathSelector';
import PasswordSetter from './PasswordSetter';
import Finish from './Finish';
import ArtifactsDownloader from './ArtifactsDownloader';

const AVAILABLE_LANG_LIST = ['zh-CN', 'en-US'];

// eslint-disable-next-line @typescript-eslint/ban-types
export interface WelcomeComponentProps extends React.PropsWithChildren<object> {
  setCompleted: React.Dispatch<React.SetStateAction<number>>;
}

const lang = {
  'en-US': enUS,
  'zh-CN': zhCN,
} as unknown as Record<string, Record<string, string>>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      width: 600,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
  })
);

export default function Welcome(): React.ReactElement {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);
  const locale = window.navigator.language;
  if (AVAILABLE_LANG_LIST.includes(locale)) {
    localStorage.locale = locale;
  } else {
    localStorage.locale = 'en-US';
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <IntlProvider locale={locale} messages={lang[localStorage.locale]}>
      <Stepper activeStep={completed}>
        {/*<Step completed={completed >= 1}>
          <StepLabel>
            <FormattedMessage id="welcome.step.lang" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 1}>
          <StepLabel>
            <FormattedMessage id="welcome.step.path" />
          </StepLabel>
        </Step>*/}
        <Step completed={completed >= 1}>
          <StepLabel>
            <FormattedMessage id="welcome.step.pwd" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 2}>
          <StepLabel>
            <FormattedMessage id="welcome.step.down" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 3}>
          <StepLabel>
            <FormattedMessage id="welcome.step.ok" />
          </StepLabel>
        </Step>
      </Stepper>
      <div style={{ width: 960, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper className={classes.container}>
          {/*completed === 0 && <LangChooser setCompleted={setCompleted} />*/}
          {/*completed === 0 && <PathSelector setCompleted={setCompleted} />*/}
          <Grow in={completed === 0} timeout={500}>
            <div>{completed === 0 && <PasswordSetter setCompleted={setCompleted} />}</div>
          </Grow>
          <Grow in={completed === 1} timeout={500}>
            <div>{completed === 1 && <ArtifactsDownloader setCompleted={setCompleted} />}</div>
          </Grow>
          <Grow in={completed === 2} timeout={500}>
            <div>{completed === 2 && <Finish />}</div>
          </Grow>
        </Paper>
      </div>
    </IntlProvider>
  );
}
