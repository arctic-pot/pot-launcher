import React from 'react';
import { PropsWithOnChoose } from './Welcome';

export default function LangChooser(props: PropsWithOnChoose): React.ReactElement {
  const {onChoose} = props;
  interface LangChooserProps {
    title: string;
    code: string;
    disabled?: boolean;
  }
  function LangChooser(props: LangChooserProps) {
    return (
      <button
        className={`chooser ${props.disabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!props.disabled) {
            localStorage.locale = props.code;
            localStorage.strings = [
              'https://',
              'cdn.jsdelivr.net',
              '/gh/datapack-planet/pot-launcher/online-resources/localization/',
              props.code.toLowerCase(),
              '/strings.json'
            ].join('');
            onChoose();
          }
        }}
      >
        <div className="chooser-title">{props.title}</div>
      </button>
    );
  }

  return (
    <div id="welcome-lang">
      <h1>Which language are you preferred in?</h1>
      <br />
      <div id="welcome-lang-choose">
        <LangChooser title="English-US" code="en-US" />
        <LangChooser title="English-UK" code="en-UK" disabled />
        <LangChooser title="简体中文" code="zh-CN" disabled />
        <LangChooser title="繁體中文-台灣" code="zh-TW" disabled />
        <LangChooser title="繁體中文-香港" code="zh-HK" disabled />
        <LangChooser title="Deutsche" code="de" disabled />
        <LangChooser title="日本語" code="ja" disabled />
        <LangChooser title="한국어" code="ko" disabled />
        <LangChooser title="français" code="fr" disabled />
        <LangChooser title="русский" code="ru" disabled />
        <LangChooser title="português" code="pt" disabled />
        <LangChooser title="Español" code="es" disabled />
      </div>
    </div>
  );
}
