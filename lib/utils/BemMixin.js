'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bemCx = require('./bemCx');

var _bemCx2 = _interopRequireDefault(_bemCx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BemMixin = function (_React$Component) {
  (0, _inherits3.default)(BemMixin, _React$Component);

  function BemMixin() {
    (0, _classCallCheck3.default)(this, BemMixin);
    return (0, _possibleConstructorReturn3.default)(this, (BemMixin.__proto__ || (0, _getPrototypeOf2.default)(BemMixin)).apply(this, arguments));
  }

  (0, _createClass3.default)(BemMixin, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        bemNamespace: this.getBemNamespace(),
        bemBlock: this.getBemBlock()
      };
    }
  }, {
    key: 'getBemNamespace',
    value: function getBemNamespace() {
      if (this.props.bemNamespace) {
        return this.props.bemNamespace;
      }
      if (this.context.bemNamespace) {
        return this.context.bemNamespace;
      }
      return null;
    }
  }, {
    key: 'getBemBlock',
    value: function getBemBlock() {
      if (this.props.bemBlock) {
        return this.props.bemBlock;
      }
      if (this.context.bemBlock) {
        return this.context.bemBlock;
      }
      return null;
    }
  }, {
    key: 'cx',
    value: function cx() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var opts = {
        namespace: this.getBemNamespace(),
        element: this.constructor.displayName,
        block: this.getBemBlock()
      };

      (0, _extends3.default)(opts, options);
      return (0, _bemCx2.default)(opts);
    }
  }]);
  return BemMixin;
}(_react2.default.Component);

BemMixin.propTypes = {
  bemNamespace: _propTypes2.default.string,
  bemBlock: _propTypes2.default.string
};
BemMixin.contextTypes = {
  bemNamespace: _propTypes2.default.string,
  bemBlock: _propTypes2.default.string
};
BemMixin.childContextTypes = {
  bemNamespace: _propTypes2.default.string,
  bemBlock: _propTypes2.default.string
};
exports.default = BemMixin;