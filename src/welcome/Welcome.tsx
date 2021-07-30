import React, { useState } from 'react';
import './Welcome.scss';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import enUS from 'assets/lang/en-us.json';
import zhCN from 'assets/lang/zh-cn.json';
import { FormattedMessage, IntlProvider } from 'react-intl';
import LangChooser from './LangChooser';
import PathSelector from './PathSelector';
import PasswordSetter from './PasswordSetter';
import Finish from './Finish';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface WelcomeComponentProps extends React.PropsWithChildren<object> {
  setCompleted: React.Dispatch<React.SetStateAction<number>>;
}

const lang = {
  'en-US': enUS,
  'zh-CN': zhCN,
} as unknown as Record<string, Record<string, string>>;

export default function Welcome(): React.ReactElement {
  const [completed, setCompleted] = useState(0);
  const locale = window.navigator.language;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <IntlProvider locale={locale} messages={(lang as any)[locale] || lang['en-US']}>
      <Stepper activeStep={completed}>
        <Step completed={completed >= 1}>
          <StepLabel>
            <FormattedMessage id="welcome.step.lang" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 2}>
          <StepLabel>
            <FormattedMessage id="welcome.step.path" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 3}>
          <StepLabel>
            <FormattedMessage id="welcome.step.pwd" />
          </StepLabel>
        </Step>
        <Step completed={completed >= 4}>
          <StepLabel>
            <FormattedMessage id="welcome.step.ok" />
          </StepLabel>
        </Step>
      </Stepper>
      <div style={{ width: 960, height: 420 }}>
        {completed === 0 && <LangChooser setCompleted={setCompleted} />}
        {completed === 1 && <PathSelector setCompleted={setCompleted} />}
        {completed === 2 && <PasswordSetter setCompleted={setCompleted} />}
        {completed === 3 && <Finish />}
      </div>
    </IntlProvider>
  );
}
