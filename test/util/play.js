'use strict';

import Vorpal from '@ApeironTsuka/vorpal';
import autocomplete from '../../src/index.js';

const vorpal = new Vorpal();

vorpal.show();

vorpal.command('foo [files...]').autocomplete(autocomplete({ directory: true }));
vorpal.command('bar [files...]').autocomplete(autocomplete());
