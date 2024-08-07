'use strict';

import Vorpal from '@ApeironTsuka/vorpal';
import grep from '../src/grep.js';
import chalk from 'chalk';

const vorpal = new Vorpal();

vorpal
  .delimiter(`${chalk.grey(`${chalk.blue(`grep example`)}:`)}`)
  .use(grep)
  .show();

vorpal.exec('grep cats ./test/fixtures/a.txt').then(function () {
  return vorpal.exec('grep cats ./fixturesandsoon**');
}).then(function () {
  return vorpal.exec('grep "14" ./test/fixtures/*.* --include \'*.md\' ');
}).catch(function (e) {
  vorpal.log(e);
});
