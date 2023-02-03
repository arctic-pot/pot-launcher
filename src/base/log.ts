/* eslint-disable @typescript-eslint/no-explicit-any */

function log(...messages: any[]): void {
  console.log(...messages);
}

// An empty function
function poof(...messages: any[]): void {
  // This step is useless
  messages.pop();
  return void 0;
}

export function initConsole() {
  if (process.env.NODE_ENV === 'devlopment') {
    window.temp.ENABLED_CONSOLE = true;
  } else {
    window.temp.ENABLED_CONSOLE = false;
    console.warn(
      '%cConsole is disabled.\n' + '%cSet your environment variable to enable this again',
      'font-weight: 600'
    );
  }
}
