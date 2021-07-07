import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export default function (): React.ReactElement {
  const [openingTab, setOpeningTab] = useState(0);
  const handleChange = (e: React.ChangeEvent<unknown>, newValue: number) => {
    setOpeningTab(newValue);
  };

  return (
    <>
      <Tabs centered value={openingTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
        <Tab label={<FormattedMessage id="home.title" />} />
        <Tab label={<FormattedMessage id="settings.title" />} />
      </Tabs>
    </>
  );
}
