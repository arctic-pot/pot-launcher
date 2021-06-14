import React from 'react';
import { PropsWithOnChoose } from './Welcome';

export default function LangChooser(props: PropsWithOnChoose): React.ReactElement {
  const { onChoose } = props;
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
              '/gh/datapack-planet/pot-launcher@localization/',
              props.code.toLowerCase(),
              '/strings.json',
            ].join('');
            onChoose();
          }
        }}
        lang={props.code}
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
        <LangChooser title="简体中文" code="zh-CN" />
        <LangChooser title="臺灣標準中文" code="zh-TW" disabled />
        <LangChooser title="香港標準中文" code="zh-HK" disabled />
        <LangChooser title="English (US)" code="en-US" />
        <LangChooser title="English (UK)" code="en-UK" disabled />
        <LangChooser title="Deutsche" code="de" disabled />
        <LangChooser title="日本語" code="ja" disabled />
        <LangChooser title="한국어" code="ko" disabled />
        <LangChooser title="français" code="fr" disabled />
        <LangChooser title="русский" code="ru" disabled />
        <LangChooser title="português" code="pt" disabled />
        <LangChooser title="Español" code="es" disabled />
      </div>
      <p lang="zh-hk">
        <br />
        香港特別行政區和澳門特別行政區使用的漢字標準相同
        <br />
        香港、澳門、臺灣均爲中國的特別行政區
      </p>
    </div>
  );
}
