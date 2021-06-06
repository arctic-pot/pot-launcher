import React, { useState } from 'react';
import './Welcome.scss';
import WelcomeChooseLang from './WelcomeChooseLang';

export default function Welcome(): React.ReactElement {
  const [usingComponent, /* setUsingComponent */] = useState(<WelcomeChooseLang />);
  return usingComponent;
}
