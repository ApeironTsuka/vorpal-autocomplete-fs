'use strict';

import $ from 'shelljs';
import fs from 'fs-extra';
import path from 'node:path';

const __dirname = path.dirname((new URL(import.meta.url)).pathname);

export default {

  writeSampleDir: function(cb) {

    // If tests fail mid, script cleanup doesn't happen.
    // This makes sure we are in the right dir before
    // trying to write.
    if (String(process.cwd()).indexOf('/cash') === -1) {
      process.chdir(__dirname + '/../..');
    }

    fs.removeSync('./testing');

    $.mkdir('-p', './testing/');
    $.mkdir('-p', './testing/sub/');

    let filler = "fill|";

    function writeDir(dir, cbk) {
      const files = [ 'a.txt', 'c.exe', 'd.json', 'e.gif', 'b.tgz', 'f.jpg', 'g', '.hidden' ];
      function write() {
        const next = files.shift();
        if (next) {
          filler = double(filler);
          fs.writeFileSync(dir + next, filler);
          //filler.to(dir + next);
          setTimeout(() => {
            write();
          }, 10)
        } else {
          cbk();
        }
      }
      write();
    }

    writeDir('./testing/', () => {
      writeDir('./testing/sub/', () => {
        cb();
      });
    })
  },

  deleteSampleDir: () => {
    fs.removeSync('./testing');
  }

}

function double(str) {
  return str + str + str.slice(0, 100);
}

