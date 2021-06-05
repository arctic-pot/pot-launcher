import React, { useEffect } from 'react';

export default function PlatformError(): React.ReactElement {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 7500);
  }, []);
  return (
    <div className="error-modal">
      <h3>&#x1F630; The Application Cannot Be Started</h3>
      <p>Pot Launcher does not supported your platform</p>
      <p className="unimportant">This window will close automatically after a few seconds</p>
    </div>
  );
}
