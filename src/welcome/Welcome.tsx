import React, { useState } from 'react';
import './Welcome.scss';
import LangChooser from './LangChooser';
import JavaChooser from './JavaChooser';

export interface PropsWithOnChoose {
  onChoose: () => void;
}

export default function Welcome(): React.ReactElement {
  const [usingComponent, setUsingComponent] = useState(
    // here for a nested component
    <LangChooser
      onChoose={() => {
        setUsingComponent(<JavaChooser />);
      }}
    />
  );
  return usingComponent;
}
