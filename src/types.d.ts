declare module '*.svg' {
  // .svg will export the base64 url, which is configured in webpack.main.config.js
  const base64URL: string;
  export default base64URL;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  electron: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcRenderer: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remote: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  temp: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public: any;
}
