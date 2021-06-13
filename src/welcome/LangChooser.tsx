import React from 'react';
import { PropsWithOnChoose } from './Welcome';

export default function LangChooser(props: PropsWithOnChoose): React.ReactElement {
  const { onChoose } = props;
  interface LangChooserProps {
    title: string;
    code: string;
    count: number;
    disabled?: boolean;
  }
  function LangChooser(props: LangChooserProps) {
    return (
      <button
        className={`chooser chooser-item-${props.count} ${props.disabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!props.disabled) {
            localStorage.locale = props.code;
            localStorage.strings = [
              'https://',
              'cdn.jsdelivr.net',
              '/gh/datapack-planet/pot-launcher/online-resources/localization/',
              props.code.toLowerCase(),
              '/strings.json',
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
        <LangChooser count={1} title="English-US" code="en-US" />
        <LangChooser count={2} title="English-UK" code="en-UK" disabled />
        <LangChooser count={3} title="简体中文" code="zh-CN" disabled />
        <LangChooser count={4} title="繁體中文-台灣" code="zh-TW" disabled />
        <LangChooser count={5} title="繁體中文-香港" code="zh-HK" disabled />
        <LangChooser count={6} title="Deutsche" code="de" disabled />
        <LangChooser count={7} title="日本語" code="ja" disabled />
        <LangChooser count={8} title="한국어" code="ko" disabled />
        <LangChooser count={9} title="français" code="fr" disabled />
        <LangChooser count={10} title="русский" code="ru" disabled />
        <LangChooser count={11} title="português" code="pt" disabled />
        <LangChooser count={12} title="Español" code="es" disabled />
      </div>
    </div>
  );
}
