/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const keys = require('../assets/lang/keys.json');
const chalk = require('chalk');
fs.readdir('./assets/lang')
  .then((files) => files.filter((file) => file !== 'keys.json'))
  .then((languages) => [languages.map((language) => fs.readJsonSync(`./assets/lang/${language}`)), languages])
  .then((_languages) => {
    const outputs = [];
    let totalErrorCounts = 0;
    let fileErrorCounts = 0;
    const languages = _languages[0];
    const languageNames = _languages[1];
    languages.forEach((language, index) => {
      let errorCounts = 0;
      Object.keys(language).forEach((langKey) => {
        if (!Object.keys(keys).includes(langKey)) {
          // because of an eslint bug, we cannot use += operator
          errorCounts = errorCounts + 1;
        }
      });
      Object.keys(keys).forEach((langKey) => {
        if (!Object.keys(language).includes(langKey)) {
          // because of an eslint bug, we cannot use += operator
          errorCounts = errorCounts + 1;
        }
      });
      if (errorCounts === 0) {
        outputs.push(chalk.gray(languageNames[index]));
      } else {
        outputs.push(`${languageNames[index]} - ${errorCounts} errors`);
        fileErrorCounts = fileErrorCounts + 1;
      }
      totalErrorCounts = totalErrorCounts + errorCounts;
    });
    console.log(outputs.join('\n'));
    console.log('');
    if (totalErrorCounts === 0) {
      console.log(chalk.underline(chalk.hex('#028E8E')('No errors found')));
      process.exit(0);
    } else {
      console.log(
        chalk.underline(chalk.red(`❌  ${totalErrorCounts} errors was found in ${fileErrorCounts} language files`))
      );
    }
  });
