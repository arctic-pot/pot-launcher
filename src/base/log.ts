/* eslint-disable @typescript-eslint/no-explicit-any */

export function log(...messages: any[]): void {
  console.log(...messages);
  
}

export function warn(...messages: any[]): void {
  console.warn(...messages);
}

export function error(...messages: any[]): void {
  console.error(...messages);
}

// An empty function
function poof(...messages: any[]): void {
  // This step is useless
  messages.pop();
  return void 0;
}

export function initConsole(): void {
  window.temp.logStack = ''
  if (localStorage.mode === 'development') {
    window.temp.ENABLED_CONSOLE = true;
  } else {
    window.temp.ENABLED_CONSOLE = false;
    console.log(
      "%cConsole is disabled due to you're in the production mode.\n" +
        '%cGo to "Settings" to find out how to turn it on!\n\n' +
        `%cPRODUCTION%cON%c\n`,
      'font-weight: 600; font-size: 0.8475rem;',
      '',
      'background-color: #8c8c8c; color: #fcfcfc; border-radius: 5px 0 0 5px; padding: 5px 10px; font-weight: 600',
      'background-color: #40a9ff; color: #fcfcfc; border-radius: 0 5px 5px 0; padding: 5px 10px; font-weight: 600',
      ''
    );
    console.log = console.info = console.error = console.warn = poof;
  }
}
