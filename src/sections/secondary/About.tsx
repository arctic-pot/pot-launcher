import React from 'react';
import './About.scss';

export default function About(): React.ReactElement {
  return (
    <div id="surface-about">
      <h1>About</h1>
      <div>
        <p>Pot Launcher is a project by TechPot Studio. TechPot Studio is a informal organization.</p>
        <p>
          Copyright © 2021 TechPot Studio and other GitHub contributors. Pot Launcher is an opensource project. Licensed
          under MIT license.
        </p>
        <p>Pot Launcher is based on Electron and other opensource projects, used React for user interface.</p>
        <p>
          The software is provided "as is", without warranty of any kind, express or implied, including but not limited
          to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall
          the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of
          contract, tort or otherwise, arising from, out of or in connection with the software or the use or other
          dealings in the software.
        </p>
      </div>
    </div>
  );
}
