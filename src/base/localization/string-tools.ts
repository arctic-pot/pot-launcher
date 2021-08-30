import langKeys from 'assets/lang/keys.json';
import { Directory } from 'typings/common';

export const fixString = (strings: Directory): Directory => {
  // For minify pack size, we mangled language key names,
  // but terser does not understand the key names will use for intl,
  // so we have to fix it.
  // The minified strings is `{a: 'String'}`.
  // The minified key file is `{a: 'key.name'}`.
  // Then we put them together and get `{'key.name': 'String'}`.
  if (
    Object.keys(strings)
      .map((key) => !!key.match(/^.+(\..+)+$/))
      .filter((value) => value === true)
  ) {
    const _strings = {};
    Object.keys(strings).forEach((string) => {
      Object.assign(_strings, { [(langKeys as Directory)[string]]: strings[string] });
    });
    return _strings;
  }
};
