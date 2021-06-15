import React, { useEffect, useState } from 'react';
import childProcess from 'child_process';

export default function JavaChooser(): React.ReactElement {
  const [isInstalledJava, setIsInstalledJava] = useState<boolean>(undefined);
  useEffect(() => {
    childProcess.exec('java -version', (error, _out, out) => {
      if (error) {
        setIsInstalledJava(false);
      } else {
        if (out.match(/(16\.[0-9]+\.[0-9]+)|(1\.8\.[0-9]+(_[0-9]+)?)/)) {
          setIsInstalledJava(true);
        } else {
          setIsInstalledJava(false);
        }
      }
    });
  }, []);
  if (isInstalledJava !== undefined) {
    return (
      <div id="welcome-java">
        {isInstalledJava ? (
          <>
            <h1>JRE Found</h1>
            <p>Hooray! We found an available Java Runtime with a right version</p>
            <button
              onClick={() => {
                localStorage.welcomed = 'true';
                location.reload();
              }}
            >
              Next
            </button>
          </>
        ) : (
          'Please install Java 16.'
        )}
      </div>
    );
  } else {
    return (
      <div id="welcome-java">
        <h1>Looking for Java</h1>
        <p>We are looking for the Java Runtime that you have installed</p>
        <p>This should take for about a few seconds</p>
      </div>
    );
  }
}
