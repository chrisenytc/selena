/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

var supertest = require('supertest');
var selena = require('../lib/selena.js');
var request = supertest(selena().http);
var chai = require('chai');
chai.expect();
chai.should();

describe('Services', function() {
  describe('Test /ws', function() {
    it('should return a JSON array and http code 200', function(done) {
      request
        .get('/ws/names')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{
          "name": "Bella"
        }, {
          "name": "Chris"
        }], done);
    });
    it('should return a JSON array and http code 200 with .json extension', function(done) {
      request
        .get('/ws/names.json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{
          "name": "Bella"
        }, {
          "name": "Chris"
        }], done);
    });
  });
});