import React from 'react';

export default function WelcomeChooseLang(): React.ReactElement {
  function LangChooser(props: Record<string, string | boolean>) {
    return (
      <button className={`chooser ${props.disabled ? 'disabled' : ''}`}>
        <div className="chooser__title">{props.title}</div>
        <div className="chooser__subtitle">{props.text}</div>
      </button>
    );
  }

  return (
    <div id="welcome-lang">
      <h1>Which language are you preferred in?</h1>
      <br />
      <div id="welcome-lang-choose">
        <LangChooser title="English-US" text="en-US" />
        <LangChooser title="English-UK" text="en-UK" disabled />
        <LangChooser title="简体中文" text="zh-CN" disabled />
        <LangChooser title="繁體中文-台灣" text="zh-TW" disabled />
        <LangChooser title="繁體中文-香港" text="zh-HK" disabled />
        <LangChooser title="Deutsche" text="de" disabled />
        <LangChooser title="日本語" text="ja" disabled />
        <LangChooser title="한국어" text="ko" disabled />
        <LangChooser title="français" text="fr" disabled />
        <LangChooser title="русский" text="ru" disabled />
        <LangChooser title="português" text="pt" disabled />
        <LangChooser title="Español" text="es" disabled />
      </div>
    </div>
  );
}
