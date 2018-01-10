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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _BemMixin2 = require('../utils/BemMixin');

var _BemMixin3 = _interopRequireDefault(_BemMixin2);

var _CustomPropTypes = require('../utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _lightenDarkenColor = require('../utils/lightenDarkenColor');

var _lightenDarkenColor2 = _interopRequireDefault(_lightenDarkenColor);

var _CalendarDatePeriod = require('./CalendarDatePeriod');

var _CalendarDatePeriod2 = _interopRequireDefault(_CalendarDatePeriod);

var _CalendarHighlight = require('./CalendarHighlight');

var _CalendarHighlight2 = _interopRequireDefault(_CalendarHighlight);

var _CalendarSelection = require('./CalendarSelection');

var _CalendarSelection2 = _interopRequireDefault(_CalendarSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarDate = function (_BemMixin) {
  (0, _inherits3.default)(CalendarDate, _BemMixin);

  function CalendarDate() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CalendarDate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CalendarDate.__proto__ || (0, _getPrototypeOf2.default)(CalendarDate)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mouseDown: false
    }, _this.mouseUp = function () {
      _this.props.onSelectDate(_this.props.date);

      if (_this.isUnmounted) {
        return;
      }

      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }

      document.removeEventListener('mouseup', _this.mouseUp);
    }, _this.mouseDown = function () {
      _this.setState({
        mouseDown: true
      });

      document.addEventListener('mouseup', _this.mouseUp);
    }, _this.touchEnd = function () {
      _this.props.onHighlightDate(_this.props.date);
      _this.props.onSelectDate(_this.props.date);

      if (_this.isUnmounted) {
        return;
      }

      if (_this.state.mouseDown) {
        _this.setState({
          mouseDown: false
        });
      }
      document.removeEventListener('touchend', _this.touchEnd);
    }, _this.touchStart = function (event) {
      event.preventDefault();
      _this.setState({
        mouseDown: true
      });
      document.addEventListener('touchend', _this.touchEnd);
    }, _this.mouseEnter = function () {
      _this.props.onHighlightDate(_this.props.date);
    }, _this.mouseLeave = function () {
      if (_this.state.mouseDown) {
        _this.props.onSelectDate(_this.props.date);

        _this.setState({
          mouseDown: false
        });
      }
      _this.props.onUnHighlightDate(_this.props.date);
    }, _this.getBemModifiers = function () {
      var _this$props = _this.props,
          date = _this$props.date,
          firstOfMonth = _this$props.firstOfMonth,
          today = _this$props.isToday;


      var otherMonth = false;
      var weekend = false;

      if (date.month() !== firstOfMonth.month()) {
        otherMonth = true;
      }

      if (date.day() === 0 || date.day() === 6) {
        weekend = true;
      }

      return { today: today, weekend: weekend, otherMonth: otherMonth };
    }, _this.getBemStates = function () {
      var _this$props2 = _this.props,
          isSelectedDate = _this$props2.isSelectedDate,
          isInSelectedRange = _this$props2.isInSelectedRange,
          isInHighlightedRange = _this$props2.isInHighlightedRange,
          highlighted = _this$props2.isHighlightedDate,
          disabled = _this$props2.isDisabled;


      var selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;

      return { disabled: disabled, highlighted: highlighted, selected: selected };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CalendarDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isUnmounted = true;
      document.removeEventListener('mouseup', this.mouseUp);
      document.removeEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          date = _props.date,
          dateRangesForDate = _props.dateRangesForDate,
          isSelectedDate = _props.isSelectedDate,
          isSelectedRangeStart = _props.isSelectedRangeStart,
          isSelectedRangeEnd = _props.isSelectedRangeEnd,
          isInSelectedRange = _props.isInSelectedRange,
          isHighlightedDate = _props.isHighlightedDate,
          isHighlightedRangeStart = _props.isHighlightedRangeStart,
          isHighlightedRangeEnd = _props.isHighlightedRangeEnd,
          isInHighlightedRange = _props.isInHighlightedRange;


      var bemModifiers = this.getBemModifiers();
      var bemStates = this.getBemStates();
      var pending = isInHighlightedRange;

      var color = void 0;
      var amColor = void 0;
      var pmColor = void 0;
      var states = dateRangesForDate(date);
      var numStates = states.count();
      var cellStyle = {};
      var style = {};

      var highlightModifier = void 0;
      var selectionModifier = void 0;

      if (isSelectedDate || isSelectedRangeStart && isSelectedRangeEnd || isHighlightedRangeStart && isHighlightedRangeEnd) {
        selectionModifier = 'single';
      } else if (isSelectedRangeStart || isHighlightedRangeStart) {
        selectionModifier = 'start';
      } else if (isSelectedRangeEnd || isHighlightedRangeEnd) {
        selectionModifier = 'end';
      } else if (isInSelectedRange || isInHighlightedRange) {
        selectionModifier = 'segment';
      }

      if (isHighlightedDate) {
        highlightModifier = 'single';
      }

      if (numStates === 1) {
        // If there's only one state, it means we're not at a boundary
        color = states.getIn([0, 'color']);

        if (color) {

          style = {
            backgroundColor: color
          };
          cellStyle = {
            borderLeftColor: (0, _lightenDarkenColor2.default)(color, -10),
            borderRightColor: (0, _lightenDarkenColor2.default)(color, -10)
          };
        }
      } else {
        amColor = states.getIn([0, 'color']);
        pmColor = states.getIn([1, 'color']);

        if (amColor) {
          cellStyle.borderLeftColor = (0, _lightenDarkenColor2.default)(amColor, -10);
        }

        if (pmColor) {
          cellStyle.borderRightColor = (0, _lightenDarkenColor2.default)(pmColor, -10);
        }
      }

      return _react2.default.createElement(
        'td',
        { className: this.cx({ element: 'Date', modifiers: bemModifiers, states: bemStates }),
          style: cellStyle,
          onTouchStart: this.touchStart,
          onMouseEnter: this.mouseEnter,
          onMouseLeave: this.mouseLeave,
          onMouseDown: this.mouseDown },
        numStates > 1 && _react2.default.createElement(
          'div',
          { className: this.cx({ element: "HalfDateStates" }) },
          _react2.default.createElement(_CalendarDatePeriod2.default, { period: 'am', color: amColor }),
          _react2.default.createElement(_CalendarDatePeriod2.default, { period: 'pm', color: pmColor })
        ),
        numStates === 1 && _react2.default.createElement('div', { className: this.cx({ element: "FullDateStates" }), style: style }),
        _react2.default.createElement(
          'span',
          { className: this.cx({ element: "DateLabel" }) },
          date.format('D')
        ),
        selectionModifier ? _react2.default.createElement(_CalendarSelection2.default, { modifier: selectionModifier, pending: pending }) : null,
        highlightModifier ? _react2.default.createElement(_CalendarHighlight2.default, { modifier: highlightModifier }) : null
      );
    }
  }]);
  return CalendarDate;
}(_BemMixin3.default);

CalendarDate.displayName = 'CalendarDate';
CalendarDate.propTypes = {
  date: _CustomPropTypes2.default.moment,

  firstOfMonth: _propTypes2.default.object.isRequired,

  isSelectedDate: _propTypes2.default.bool,
  isSelectedRangeStart: _propTypes2.default.bool,
  isSelectedRangeEnd: _propTypes2.default.bool,
  isInSelectedRange: _propTypes2.default.bool,

  isHighlightedDate: _propTypes2.default.bool,
  isHighlightedRangeStart: _propTypes2.default.bool,
  isHighlightedRangeEnd: _propTypes2.default.bool,
  isInHighlightedRange: _propTypes2.default.bool,

  highlightedDate: _propTypes2.default.object,
  dateStates: _propTypes2.default.instanceOf(_immutable2.default.List),
  isDisabled: _propTypes2.default.bool,
  isToday: _propTypes2.default.bool,

  dateRangesForDate: _propTypes2.default.func,
  onHighlightDate: _propTypes2.default.func,
  onUnHighlightDate: _propTypes2.default.func,
  onSelectDate: _propTypes2.default.func
};
exports.default = CalendarDate;