# Vorpal - File System Autocompletion

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

An extension to [Vorpal](https://github.com/ApeironTsuka/vorpal) that provides File System-based tabbed autocompletion for a given command. This is an exact match of the autocomplete functionality provided in Unix commands like `ls` or `cat`.

### Installation

```bash
npm install @ApeironTsuka/vorpal-autocomplete-fs
npm install @ApeironTsuka/vorpal
```

### Getting Started

```js
import Vorpal from '@ApeironTsuka/vorpal';
import fsAutocomplete from '@ApeironTsuka/vorpal-autocomplete-fs';

const vorpal = new Vorpal();

vorpal.delimiter('myapp$').show();

vorpal
  .command('cat [dirs...]')
  .autocomplete(fsAutocomplete());
```

```bash
$ node myapp.js
myapp$ cat [tab] [tab]
bin/  myapp.js  package.json  README.md
myapp~$ cat m [tab]
myapp~$ cat myapp.js

```

#### Only show directories

To omit files from the autocomplete and only show directories, pass in the `directory` option:

```js
vorpal
  .command('cat [dirs...]')
  .autocomplete(fsAutocomplete({directory: true}));
```

### License

MIT © [David Caccavella](https://github.com/dthree)

