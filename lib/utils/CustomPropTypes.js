'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _momentRange = require('moment-range');

var _isMomentRange = require('./isMomentRange');

var _isMomentRange2 = _interopRequireDefault(_isMomentRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _moment = (0, _momentRange.extendMoment)(_moment3.default);

exports.default = {
  momentOrMomentRange: function momentOrMomentRange(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if (_moment.isMoment(val)) {
      return null;
    } else if ((0, _isMomentRange2.default)(val)) {
      return null;
    }
    return new Error('\'' + propName + '\' must be a moment or a moment range');
  },
  moment: function moment(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if (_moment.isMoment(val)) {
      return null;
    }
    return new Error('\'' + propName + '\' must be a moment');
  },
  momentRange: function momentRange(props, propName) {
    var val = props[propName];

    if (!val) {
      return null;
    } else if ((0, _isMomentRange2.default)(val)) {
      return null;
    }
    return new Error('\'' + propName + '\' must be a moment range');
  }
};