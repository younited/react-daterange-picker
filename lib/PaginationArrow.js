'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _BemMixin2 = require('./utils/BemMixin');

var _BemMixin3 = _interopRequireDefault(_BemMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationArrow = function (_BemMixin) {
  (0, _inherits3.default)(PaginationArrow, _BemMixin);

  function PaginationArrow() {
    (0, _classCallCheck3.default)(this, PaginationArrow);
    return (0, _possibleConstructorReturn3.default)(this, (PaginationArrow.__proto__ || (0, _getPrototypeOf2.default)(PaginationArrow)).apply(this, arguments));
  }

  (0, _createClass3.default)(PaginationArrow, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          direction = _props.direction,
          onTrigger = _props.onTrigger,
          props = (0, _objectWithoutProperties3.default)(_props, ['disabled', 'direction', 'onTrigger']);

      var modifiers = (0, _defineProperty3.default)({}, direction, true);
      var states = { disabled: disabled };

      var elementOpts = {
        modifiers: modifiers,
        states: states
      };

      var iconOpts = {
        element: 'PaginationArrowIcon',
        modifiers: modifiers,
        states: states
      };

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: this.cx(elementOpts) }, props, { onClick: onTrigger }),
        _react2.default.createElement('div', { className: this.cx(iconOpts) })
      );
    }
  }]);
  return PaginationArrow;
}(_BemMixin3.default);

PaginationArrow.displayName = 'PaginationArrow';
PaginationArrow.propTypes = {
  disabled: _propTypes2.default.bool,
  onTrigger: _propTypes2.default.func,
  direction: _propTypes2.default.oneOf(['next', 'previous'])
};
PaginationArrow.defaultProps = {
  disabled: false
};
exports.default = PaginationArrow;