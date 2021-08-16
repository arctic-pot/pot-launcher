/* eslint-disable @typescript-eslint/no-var-requires */
const keys = require('../assets/lang/keys.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');
fs.readdir('./assets/lang')
  .then((files) => files.filter((file) => file !== 'keys.json'))
  .then((languages) => [languages.map((language) => fs.readJsonSync(`./assets/lang/${language}`)), languages])
  .then((_languages) => {
    const wrongLanguages = [];
    const languages = _languages[0];
    const languageNames = _languages[1];
    languages.forEach((language, index) => {
      let errorCounts = 0;
      Object.keys(language).forEach((langKey) => {
        if (!Object.keys(keys).includes(langKey)) {
          // because of an eslint bug, we cannot use += operator
          errorCounts = 1;
        }
      });
      Object.keys(keys).forEach((langKey) => {
        if (!Object.keys(language).includes(langKey)) {
          // because of an eslint bug, we cannot use += operator
          errorCounts = 1;
        }
      });
      if (errorCounts !== 0) {
        wrongLanguages.push(languageNames[index]);
      }
    });
    return wrongLanguages;
  })
  .then((wrongLanguages) => {
    if (wrongLanguages.length) return wrongLanguages;
    console.log(chalk.bold('No errors found'));
    process.exit(0);
  })
  .then((wrongLanguages) =>
    inquirer.prompt([
      {
        type: 'list',
        choices: wrongLanguages.map((lang) => lang.slice(0, 3) + lang.slice(3, 5).toUpperCase()),
        message: 'Fix language',
        name: 'lang',
        filter: (lang) => {
          return lang.toLowerCase() + '.json';
        },
      },
    ])
  )
  .then(({ lang }) =>
    fs.readJson(`./assets/lang/${lang}`).then((strings) => {
      const _strings = strings;
      const _ = { ...strings, ...keys };
      Object.keys(_).forEach((key) => {
        if (_[key] !== key) {
          console.log(chalk.bold(`Deleting trailing key ${key}`));
          delete _strings[key];
        }
      });
      Object.keys(keys).forEach((key) => {
        if (!Object.keys(strings).includes(key)) {
          console.log(chalk.bold(`Adding missing key ${key}`));
          _strings[key] = '';
        }
      });
      return fs.writeJson(`./assets/lang/${lang}`, _strings, { spaces: 2 });
    })
  )
  .then(() => {
    console.log(chalk.bold('Done!'));
  });
