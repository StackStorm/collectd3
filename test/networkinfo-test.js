/*global describe:true, it:true*/
'use strict';

var expect = require('expect.js');

describe('Network Info', function () {
  var loadInfo = require('../lib/networkinfo.js'),
      res = function (callback) {
        return { json: callback };
      },
      req = null;

  describe('Interface callback', function () {

    it('should be a function', function () {
      expect(loadInfo).to.be.a('function');
    });

    it('should return non empty object', function (next) {
      var expected = function (data) {
        expect(data).to.be.an('object');
        expect(data).not.to.be.empty();
        next();
      };
      loadInfo(req, res(expected), next);
    });

    describe('heatmap', function () {
      it('should have certain structure', function (next) {
        var expected = function (data) {
          expect(data).to.have.property('heatmap');
          expect(data.heatmap).to.have.length(3);
          expect(data.heatmap[1]).to.be.an('object');
          expect(data.heatmap[1]).to.only.have.keys('key', 'value');
          next();
        };
        loadInfo(req, res(expected), next);
      });

      it('should return correct values', function (next) {
        var expected = function (data) {
          expect(data.heatmap[2].key).to.be('localhost');
          expect(data.heatmap[2].value).to.be(3468687.1039241);
          next();
        };
        loadInfo(req, res(expected), next);
      });

    });

  });

});