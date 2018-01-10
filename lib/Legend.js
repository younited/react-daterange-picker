'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Legend = function (_BemMixin) {
  (0, _inherits3.default)(Legend, _BemMixin);

  function Legend() {
    (0, _classCallCheck3.default)(this, Legend);
    return (0, _possibleConstructorReturn3.default)(this, (Legend.__proto__ || (0, _getPrototypeOf2.default)(Legend)).apply(this, arguments));
  }

  (0, _createClass3.default)(Legend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedLabel = _props.selectedLabel,
          stateDefinitions = _props.stateDefinitions;

      var items = [];
      var name = void 0;
      var def = void 0;
      var style = void 0;

      for (name in stateDefinitions) {
        def = stateDefinitions[name];
        if (def.label && def.color) {
          style = {
            backgroundColor: def.color
          };
          items.push(_react2.default.createElement(
            'li',
            { className: this.cx({ element: 'LegendItem' }), key: name },
            _react2.default.createElement('span', { className: this.cx({ element: 'LegendItemColor' }), style: style }),
            _react2.default.createElement(
              'span',
              { className: this.cx({ element: 'LegendItemLabel' }) },
              def.label
            )
          ));
        }
      }

      return _react2.default.createElement(
        'ul',
        { className: this.cx() },
        _react2.default.createElement(
          'li',
          { className: this.cx({ element: 'LegendItem' }) },
          _react2.default.createElement('span', { className: this.cx({ element: 'LegendItemColor', modifiers: { 'selection': true } }) }),
          _react2.default.createElement(
            'span',
            { className: this.cx({ element: 'LegendItemLabel' }) },
            selectedLabel
          )
        ),
        items
      );
    }
  }]);
  return Legend;
}(_BemMixin3.default);

Legend.displayName = 'Legend';
Legend.propTypes = {
  selectedLabel: _propTypes2.default.string.isRequired,
  stateDefinitions: _propTypes2.default.object.isRequired
};
exports.default = Legend;