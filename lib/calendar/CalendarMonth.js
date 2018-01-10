'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _BemMixin2 = require('../utils/BemMixin');

var _BemMixin3 = _interopRequireDefault(_BemMixin2);

var _CustomPropTypes = require('../utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _isMomentRange = require('../utils/isMomentRange');

var _isMomentRange2 = _interopRequireDefault(_isMomentRange);

var _datesInVisualMonth = require('../utils/datesInVisualMonth');

var _datesInVisualMonth2 = _interopRequireDefault(_datesInVisualMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var CalendarMonth = function (_BemMixin) {
  (0, _inherits3.default)(CalendarMonth, _BemMixin);

  function CalendarMonth() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CalendarMonth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CalendarMonth.__proto__ || (0, _getPrototypeOf2.default)(CalendarMonth)).call.apply(_ref, [this].concat(args))), _this), _this.setLocale = function (locale) {
      moment.locale(locale);
      _this.WEEKDAYS = _immutable2.default.List(moment.weekdays()).zip(_immutable2.default.List(moment.weekdaysShort()));
      _this.MONTHS = _immutable2.default.List(moment.months());
    }, _this.renderDay = function (date, i) {
      var _this$props = _this.props,
          CalendarDate = _this$props.dateComponent,
          value = _this$props.value,
          highlightedDate = _this$props.highlightedDate,
          highlightedRange = _this$props.highlightedRange,
          hideSelection = _this$props.hideSelection,
          enabledRange = _this$props.enabledRange,
          props = (0, _objectWithoutProperties3.default)(_this$props, ['dateComponent', 'value', 'highlightedDate', 'highlightedRange', 'hideSelection', 'enabledRange']);

      var d = moment(date).locale(_this.props.locale);

      var isInSelectedRange = void 0;
      var isSelectedDate = void 0;
      var isSelectedRangeStart = void 0;
      var isSelectedRangeEnd = void 0;

      if (!hideSelection && value && moment.isMoment(value) && value.isSame(d, 'day')) {
        isSelectedDate = true;
      } else if (!hideSelection && value && (0, _isMomentRange2.default)(value) && value.contains(d)) {
        isInSelectedRange = true;

        isSelectedRangeStart = value.start.isSame(d, 'day');
        isSelectedRangeEnd = value.end.isSame(d, 'day');
      }

      return _react2.default.createElement(CalendarDate, (0, _extends3.default)({
        key: i,
        isToday: d.isSame(moment(), 'day'),
        isDisabled: !enabledRange.contains(d),
        isHighlightedDate: !!(highlightedDate && highlightedDate.isSame(d, 'day')),
        isHighlightedRangeStart: !!(highlightedRange && highlightedRange.start.isSame(d, 'day')),
        isHighlightedRangeEnd: !!(highlightedRange && highlightedRange.end.isSame(d, 'day')),
        isInHighlightedRange: !!(highlightedRange && highlightedRange.contains(d)),
        isSelectedDate: isSelectedDate,
        isSelectedRangeStart: isSelectedRangeStart,
        isSelectedRangeEnd: isSelectedRangeEnd,
        isInSelectedRange: isInSelectedRange,
        date: d
      }, props));
    }, _this.renderWeek = function (dates, i) {
      var days = dates.map(_this.renderDay);
      return _react2.default.createElement(
        'tr',
        { className: _this.cx({ element: 'Week' }), key: i },
        days.toJS()
      );
    }, _this.renderDayHeaders = function () {
      var firstOfWeek = _this.props.firstOfWeek;

      var indices = _immutable2.default.Range(firstOfWeek, 7).concat(_immutable2.default.Range(0, firstOfWeek));

      var headers = indices.map(function (index) {
        var weekday = this.WEEKDAYS.get(index);
        return _react2.default.createElement(
          'th',
          { className: this.cx({ element: 'WeekdayHeading' }), key: weekday, scope: 'col' },
          _react2.default.createElement(
            'abbr',
            { title: weekday[0] },
            weekday[1]
          )
        );
      }.bind(_this));

      return _react2.default.createElement(
        'tr',
        { className: _this.cx({ element: 'Weekdays' }) },
        headers.toJS()
      );
    }, _this.handleYearChange = function (event) {
      _this.props.onYearChange(parseInt(event.target.value, 10));
    }, _this.renderYearChoice = function (year) {
      var enabledRange = _this.props.enabledRange;


      if (year < enabledRange.start.year()) {
        return null;
      }

      if (year > enabledRange.end.year()) {
        return null;
      }

      return _react2.default.createElement(
        'option',
        { key: year, value: year },
        moment(year, 'YYYY').locale(_this.props.locale).format('YYYY')
      );
    }, _this.renderHeaderYear = function () {
      var firstOfMonth = _this.props.firstOfMonth;

      var y = firstOfMonth.year();
      var years = _immutable2.default.Range(y - 50, y).concat(_immutable2.default.Range(y, y + 50));
      var choices = years.map(_this.renderYearChoice);
      var modifiers = { year: true };
      return _react2.default.createElement(
        'span',
        { className: _this.cx({ element: 'MonthHeaderLabel', modifiers: modifiers }) },
        firstOfMonth.locale(_this.props.locale).format('YYYY'),
        _this.props.disableNavigation ? null : _react2.default.createElement(
          'select',
          { className: _this.cx({ element: 'MonthHeaderSelect' }), value: y, onChange: _this.handleYearChange },
          choices.toJS()
        )
      );
    }, _this.handleMonthChange = function (event) {
      _this.props.onMonthChange(parseInt(event.target.value, 10));
    }, _this.renderMonthChoice = function (month, i) {
      var _this$props2 = _this.props,
          firstOfMonth = _this$props2.firstOfMonth,
          enabledRange = _this$props2.enabledRange;

      var disabled = false;
      var year = firstOfMonth.year();

      if (moment({ years: year, months: i + 1, date: 1 }).unix() < enabledRange.start.unix()) {
        disabled = true;
      }

      if (moment({ years: year, months: i, date: 1 }).unix() > enabledRange.end.unix()) {
        disabled = true;
      }

      return _react2.default.createElement(
        'option',
        { key: month, value: i, disabled: disabled ? 'disabled' : null },
        month
      );
    }, _this.renderHeaderMonth = function () {
      var firstOfMonth = _this.props.firstOfMonth;

      var choices = _this.MONTHS.map(_this.renderMonthChoice);
      var modifiers = { month: true };

      return _react2.default.createElement(
        'span',
        { className: _this.cx({ element: 'MonthHeaderLabel', modifiers: modifiers }) },
        firstOfMonth.locale(_this.props.locale).format('MMMM'),
        _this.props.disableNavigation ? null : _react2.default.createElement(
          'select',
          { className: _this.cx({ element: 'MonthHeaderSelect' }), value: firstOfMonth.month(), onChange: _this.handleMonthChange },
          choices.toJS()
        )
      );
    }, _this.renderHeader = function () {
      return _react2.default.createElement(
        'div',
        { className: _this.cx({ element: 'MonthHeader' }) },
        _this.renderHeaderMonth(),
        ' ',
        _this.renderHeaderYear()
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CalendarMonth, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var locale = this.props.locale;

      this.setLocale(locale);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var locale = nextProps.locale;

      if (locale !== this.props.locale) {
        this.setLocale(locale);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          firstOfWeek = _props.firstOfWeek,
          firstOfMonth = _props.firstOfMonth;


      var monthDates = _immutable2.default.fromJS((0, _datesInVisualMonth2.default)({ firstDayOfWeek: firstOfWeek, year: firstOfMonth.year(), month: firstOfMonth.month() }));
      var weeks = monthDates.map(this.renderWeek);

      return _react2.default.createElement(
        'div',
        { className: this.cx({ element: 'Month' }) },
        this.renderHeader(),
        _react2.default.createElement(
          'table',
          { className: this.cx({ element: 'MonthDates' }) },
          _react2.default.createElement(
            'thead',
            null,
            this.renderDayHeaders()
          ),
          _react2.default.createElement(
            'tbody',
            null,
            weeks.toJS()
          )
        )
      );
    }
  }]);
  return CalendarMonth;
}(_BemMixin3.default);

CalendarMonth.displayName = 'CalendarMonth';
CalendarMonth.propTypes = {
  dateComponent: _propTypes2.default.func,
  disableNavigation: _propTypes2.default.bool,
  enabledRange: _CustomPropTypes2.default.momentRange,
  firstOfMonth: _CustomPropTypes2.default.moment,
  firstOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
  hideSelection: _propTypes2.default.bool,
  highlightedDate: _propTypes2.default.object,
  highlightedRange: _propTypes2.default.object,
  onMonthChange: _propTypes2.default.func,
  onYearChange: _propTypes2.default.func,
  value: _CustomPropTypes2.default.momentOrMomentRange,
  locale: _propTypes2.default.string
};
exports.default = CalendarMonth;