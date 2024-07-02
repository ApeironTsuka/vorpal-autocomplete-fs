import assert from 'assert';
import _ from 'lodash';
import should from 'should';
import autocomplete from '../src/index.js';
import Vorpal from '@ApeironTsuka/vorpal';

const vorpal = new Vorpal();

vorpal.show();

describe('autocomplete', () => {

  it('should register without throwing', () => {
  (() => {
      vorpal.command('bar [files...]')
        .autocomplete(autocomplete({ directory: true }));
    }).should.not.throw();
    (() => {
      vorpal.command('foo [files...]')
        .autocomplete(autocomplete());
    }).should.not.throw();
  });

  it('should autocomplete a given method', () => {
    _.set(vorpal.ui, '_activePrompt.screen.rl.cursor', 7);
    vorpal.session.getAutocomplete('foo pac', (err, res) => {
      res.should.equal('foo package.json ');
    })
  });

  it('should do nothing on first tab', () => {
    _.set(vorpal.ui, '_activePrompt.screen.rl.cursor', 4);
    vorpal.session.getAutocomplete('foo ', (err, res) => {
      (res === undefined).should.be.true;
    })
  });

  it('should list contents on second tab', () => {
    vorpal.session.getAutocomplete('foo ', (err, res) => {
      res.should.be.instanceOf(Array);
    })
  });

  it('should give a system bell on an invalid item', () => {
    _.set(vorpal.ui, '_activePrompt.screen.rl.cursor', 13);
    vorpal.session.getAutocomplete('foo ./asdfed/', (err, res) => {
      (res === undefined).should.be.true;
    })
  });

});
