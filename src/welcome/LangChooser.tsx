import React from 'react';
// eslint-disable-next-line import/namespace
import { WelcomeComponentProps } from './Welcome';
import { ButtonBase, Grid, Paper } from '@material-ui/core';

const LANG_LIST = [
  ['zh-CN', '简体中文'],
  ['en-US', 'English (US)'],
  ['en-UK', 'English (UK)', 'unavailable'],
  ['zh-TW', '繁體中文（中國臺灣）', 'unavailable'],
  ['zh-HK', '繁體中文（中國香港）', 'unavailable'],
  ['ja', '日本語', 'unavailable'],
  ['fr', 'Français', 'unavailable'],
  ['de', 'Deutsch', 'unavailable'],
  ['pt', 'Português', 'unavailable'],
  ['es', 'Español', 'unavailable'],
];

export default function LangChooser(props: WelcomeComponentProps): React.ReactElement {
  return (
    <div style={{ boxSizing: 'border-box', padding: 20 }}>
      <Grid container spacing={3}>
        {LANG_LIST.map((lang) => {
          return (
            <Grid item xs={3} key={lang[0]}>
              <Paper>
                <ButtonBase
                  className="lang-button"
                  disabled={!!lang[2]}
                  lang={lang[0]}
                  onClick={() => {
                    localStorage.locale = lang[0];
                    props.setCompleted(1);
                  }}
                >
                  {lang[1]}
                </ButtonBase>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
