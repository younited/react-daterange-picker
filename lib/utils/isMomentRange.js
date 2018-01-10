'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMomentRange;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

function isMomentRange(val) {
  return val && val.start && val.end && moment.isMoment(val.start) && moment.isMoment(val.end);
}