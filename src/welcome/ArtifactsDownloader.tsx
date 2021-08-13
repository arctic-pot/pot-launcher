import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/namespace
import { WelcomeComponentProps } from './Welcome';
import { LinearProgress } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import os from 'os';
import download from 'download';
import path from 'path';
import fs from 'fs-extra';
import got from 'got';

export default function ArtifactsDownloader(props: WelcomeComponentProps): React.ReactElement {
  const [status, setStatus] = useState<string | React.ReactElement>();

  useEffect(() => {
    const savePath = path.resolve(process.cwd(), './artifacts');
    const osType = os.type();
    const osTypeId = osType === 'Windows_NT' ? 'windows' : osType === 'Darwin' ? 'macos' : 'linux';
    const params =
      'arch=x86&' +
      'package-type=zip&' +
      'bundle-type=jre&' +
      'output=text&' +
      'fields=downloadUrl&' +
      `bitness=${os.arch().slice(1)}&` +
      `os=${osTypeId}`;

    fs.ensureDir(savePath)
      // Empty directory to avoid strange errors
      .then(() => fs.emptyDir(savePath))
      // Artifact I - Java 8
      .then(() => setStatus('Downloading: Java 8'))
      .then(() => got.get('https://api.bell-sw.com/v1/liberica/releases?version=8u302+8&' + params))
      .then((response) => response.body)
      .then((url) => download(url, savePath, { extract: true }))
      // Artifact II - Java 16
      .then(() => setStatus('Downloading: Java 16'))
      .then(() => got.get('https://api.bell-sw.com/v1/liberica/releases?version=16.0.2+7&' + params))
      .then((response) => response.body)
      .then((url) => download(url, savePath, { extract: true }))
      // Artifact III - aria2 - for future downloads
      // All artifacts downloaded =D
      .then(() => setStatus('Complete'))
      .then(() => props.setCompleted(2))
      .catch(() => {
        setStatus(<FormattedMessage id="welcome.down.fail" />);
      });
  }, []);

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <FormattedMessage id="welcome.down.desc" />
        <div>
          <br />
        </div>
        <FormattedMessage id="welcome.down.desc2" />
        <div>
          <br />
        </div>
        {status && (
          <>
            {status}
            <div>
              <br />
            </div>
          </>
        )}
        <LinearProgress />
      </div>
    </>
  );
}
