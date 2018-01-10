'use strict';

var _areMomentValuesEqual = require('../areMomentValuesEqual');

var _areMomentValuesEqual2 = _interopRequireDefault(_areMomentValuesEqual);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

describe('areMomentValuesEqual', function () {
  var today = function today() {
    return moment("2014-06-01T12:00:00Z");
  };

  describe('when either value is not a moment instance', function () {
    beforeEach(function () {
      this.validDate = today();
    });

    it('returns false if the first value is not a moment instance', function () {
      expect((0, _areMomentValuesEqual2.default)(undefined, this.validDate)).toBe(false);
    });

    it('returns false if the first second is not a moment instance', function () {
      expect((0, _areMomentValuesEqual2.default)(this.validDate, undefined)).toBe(false);
    });

    it('returns false if either values are not a moment instance', function () {
      expect((0, _areMomentValuesEqual2.default)(undefined, undefined)).toBe(false);
    });
  });

  describe('when both values are moment instances', function () {
    it('returns true on the same day', function () {
      var value = today();
      expect((0, _areMomentValuesEqual2.default)(value, value.clone())).toBe(true);
    });

    it('returns false on difference days', function () {
      expect((0, _areMomentValuesEqual2.default)(today(), today().add(1, 'day'))).toBe(false);
    });
  });
});