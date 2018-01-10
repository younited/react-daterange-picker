'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

var _areMomentRangesEqual = require('./areMomentRangesEqual');

var _areMomentRangesEqual2 = _interopRequireDefault(_areMomentRangesEqual);

var _isMomentRange = require('./isMomentRange');

var _isMomentRange2 = _interopRequireDefault(_isMomentRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;

  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key)) {
      if (!objB.hasOwnProperty(key)) {
        return false;
      } else if (moment.isMoment(objA[key]) && moment.isMoment(objB[key])) {
        if (!objA[key].isSame(objB[key], 'day')) {
          return false;
        }
      } else if ((0, _isMomentRange2.default)(objA[key]) && (0, _isMomentRange2.default)(objB[key])) {
        if (!(0, _areMomentRangesEqual2.default)(objA[key], objB[key])) {
          return false;
        }
      } else if (objA[key] !== objB[key]) {
        return false;
      }
    }
  }

  // Test for B's keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

exports.default = shallowEqual;