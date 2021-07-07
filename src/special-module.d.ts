declare module '*.svg' {
  // .svg will export the base64 url, which is configured in webpack.main.config.js
  const base64URL: string;
  export default base64URL;
}
