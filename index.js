'use strict';
const Mocha = require('mocha');
const should = require('should');
var mocha = new Mocha();

mocha.addFile('./test/solutions-test.js');
mocha.run();
