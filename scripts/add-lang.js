/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const supportedLang = require('../assets/supportedLang.json');
const childProcess = require('child_process')

//console.log(chalk.bold('\n === Create language tool === \n'));

fs.readdir('./assets/lang')
  .then((languages) => languages.map((language) => language.slice(0, language.length - 5)))
  .then((languages) =>
    inquirer.prompt([
      {
        type: 'confirm',
        message: 'Select language in list',
        name: 'sts',
        default: false
      },
      {
        type: 'input',
        message: 'Language code',
        name: 'code',
        validate: (code) => {
          if (typeof code === 'undefined') return 'Type something!';
          if (languages.includes(code.toLowerCase())) return 'This language is already exist!';
          if (supportedLang.includes(code)) return true;
          return 'Invalid language code or unsupported language!';
        },
        filter: (code) => {
          if (code.match(/^[a-z]{2}-[A-Za-z]{2}$/)) return code.slice(0, 2) + '-' + code.slice(3, 5).toUpperCase();
          return code;
        },
        when: (answers) => !answers.sts
      },
      {
        type: 'list',
        message: 'Select a language',
        name: 'code',
        choices: supportedLang,
        when: (answers) => answers.sts
      },
      {
        type: 'list',
        message: 'Copy from an existing language',
        name: 'from',
        choices: languages
          .filter((language) => language !== 'keys')
          .map((l) => l.slice(0, 3) + l.slice(3, 5).toUpperCase()),
      },
      {
        type: 'confirm',
        message: 'Add to git',
        name: 'git',
        default: true
      }
    ])
  )
  .then((answers) => {
    const from = answers.from.toLowerCase();
    const code = answers.code.toLowerCase();
    fs.copyFileSync(`./assets/lang/${from}.json`, `./assets/lang/${code}.json`);
    console.log(chalk.bold(`Copied language successfully`));
    if (answers.git) {
      childProcess.execSync(`git add ./assets/lang/${code}.json`)
    }
  });
