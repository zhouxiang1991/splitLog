"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _child_process = require("child_process");

var _fs = require("fs");

var _cron = require("cron");

var _default = function _default() {
  var cronTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0 0 0 * * *';
  var job = new _cron.CronJob({
    cronTime: cronTime,
    onTick: function onTick() {
      var out = (0, _fs.statSync)('./logs/out/out.log');

      if (out && out.size) {
        (0, _child_process.execSync)('cp ./logs/out/out.log ./logs/out/$(date +"%Y-%m-%d").log');
        (0, _child_process.execSync)('> ./logs/out/out.log');
      }

      var err = (0, _fs.statSync)('./logs/err/err.log');

      if (err && err.size) {
        (0, _child_process.execSync)('cp ./logs/err/err.log ./logs/err/$(date +"%Y-%m-%d").log');
        (0, _child_process.execSync)('> ./logs/err/err.log');
      }
    },
    start: false,
    timeZone: 'Asia/Shanghai'
  });
  return job;
};

exports.default = _default;