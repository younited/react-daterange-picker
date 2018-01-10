'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BemMixin2 = require('../utils/BemMixin');

var _BemMixin3 = _interopRequireDefault(_BemMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarSelection = function (_BemMixin) {
  (0, _inherits3.default)(CalendarSelection, _BemMixin);

  function CalendarSelection() {
    (0, _classCallCheck3.default)(this, CalendarSelection);
    return (0, _possibleConstructorReturn3.default)(this, (CalendarSelection.__proto__ || (0, _getPrototypeOf2.default)(CalendarSelection)).apply(this, arguments));
  }

  (0, _createClass3.default)(CalendarSelection, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          modifier = _props.modifier,
          pending = _props.pending;

      var modifiers = (0, _defineProperty3.default)({}, modifier, true);
      var states = {
        pending: pending
      };

      return _react2.default.createElement('div', { className: this.cx({ states: states, modifiers: modifiers }) });
    }
  }]);
  return CalendarSelection;
}(_BemMixin3.default);

CalendarSelection.displayName = 'CalendarSelection';
CalendarSelection.propTypes = {
  modifier: _propTypes2.default.string,
  pending: _propTypes2.default.bool.isRequired
};
exports.default = CalendarSelection;