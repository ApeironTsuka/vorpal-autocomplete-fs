import assert from 'assert';
import should from 'should';
import strip from 'strip-ansi';
import util from './util/util.js';
import _ls from '../src/index.js';
import os from 'node:os';

const ls = _ls();

const expected = {
  rootDirFlat: 'a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g  sub\n',
  rootDirFlatAll: '.  ..  a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g  .hidden  sub\n',
  rootDirFlatHidden: 'a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g  .hidden  sub\n',
  rootDirFlatReversed: 'a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g  sub\n',
  rootDirFlatClassified: 'a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g  sub/\n',
  rootDirFlatThinWidth: 'a.txt\nb.tgz\nc.exe\nd.json\ne.gif\nf.jpg\ng\nsub\n',
  rootDirFlatQuotes: '"a.txt"  "b.tgz"  "c.exe"  "d.json"  "e.gif"  "f.jpg"  "g"  "sub"\n',
  rootDirFlatByFileSize: 'sub  g  f.jpg  b.tgz  e.gif  d.json  c.exe  a.txt\n',
  subDirFlat: 'a.txt  b.tgz  c.exe  d.json  e.gif  f.jpg  g\n'
}

describe('ls', () => {

  before((done) => {
    util.writeSampleDir(() => {
      process.chdir('./testing/');
      done();
    });
  });

  after(() => {
    process.chdir('..');
    util.deleteSampleDir();
  });

  describe('directory listings', () => {

    it('should exist', () => {
      should.exist(ls);
    });

    it('should have an exec function', () => {
      should.exist(ls.exec);
    });

    it('should list current dir as default', () => {
      const res = ls.exec();
      strip(res.join('  ') + '\n').should.equal(expected.rootDirFlat);
    });

    it('should list a sub directory', () => {
      const res = ls.exec('./sub');
      strip(res.join('  ') + '\n').should.equal(expected.subDirFlat);
    });

    it('should list a parent directory', () => {
      process.chdir('./sub/');
      const res = ls.exec('..');
      strip(res.join('  ') + '\n').should.equal(expected.rootDirFlat);
      process.chdir('..');
    });

  });

  describe('file display', () => {

    it('should list hidden files with --almost-all', () => {
      const res = ls.exec('.', { almostall: true });
      strip(res.join('  ') + '\n').should.equal(expected.rootDirFlatHidden);
    });

    it('should list hidden and implied files with --all', () => {
      const res = ls.exec('.', { all: true });
      strip(res.join('  ') + '\n').should.equal(expected.rootDirFlatAll);
    });

    it('should list append "/" to folders with --classify', () => {
      const res = ls.exec('.', { classify: true });
      strip(res.join('  ') + '\n').should.equal(expected.rootDirFlatClassified);
    });
  });
});
