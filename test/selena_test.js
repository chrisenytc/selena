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

describe('index controller', function() {
  describe('Test /index', function() {
    //GET
    it('should return a success GET request and http code 200', function(done) {
      request
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
    //GET
    it('should return a success GET request and http code 200', function(done) {
      request
        .get('/index')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
  });
});