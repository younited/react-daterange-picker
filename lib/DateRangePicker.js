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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _BemMixin2 = require('./utils/BemMixin');

var _BemMixin3 = _interopRequireDefault(_BemMixin2);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _CalendarMonth = require('./calendar/CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _CalendarDate = require('./calendar/CalendarDate');

var _CalendarDate2 = _interopRequireDefault(_CalendarDate);

var _PaginationArrow = require('./PaginationArrow');

var _PaginationArrow2 = _interopRequireDefault(_PaginationArrow);

var _isMomentRange = require('./utils/isMomentRange');

var _isMomentRange2 = _interopRequireDefault(_isMomentRange);

var _hasUpdatedValue = require('./utils/hasUpdatedValue');

var _hasUpdatedValue2 = _interopRequireDefault(_hasUpdatedValue);

var _getYearMonth = require('./utils/getYearMonth');

var _datesInVisualMonth = require('./utils/datesInVisualMonth');

var _datesInVisualMonth2 = _interopRequireDefault(_datesInVisualMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var absoluteMinimum = moment(new Date(-8640000000000000 / 2)).startOf('day');
var absoluteMaximum = moment(new Date(8640000000000000 / 2)).startOf('day');

function noop() {}

var DateRangePicker = function (_BemMixin) {
  (0, _inherits3.default)(DateRangePicker, _BemMixin);

  function DateRangePicker(props, context) {
    (0, _classCallCheck3.default)(this, DateRangePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangePicker.__proto__ || (0, _getPrototypeOf2.default)(DateRangePicker)).call(this, props, context));

    _initialiseProps.call(_this);

    var now = new Date();
    var initialYear = props.initialYear,
        initialMonth = props.initialMonth,
        initialFromValue = props.initialFromValue,
        value = props.value;

    var year = now.getFullYear();
    var month = now.getMonth();

    if (initialYear && initialMonth) {
      year = initialYear;
      month = initialMonth;
    }

    if (initialFromValue && value) {
      var yearMonth = (0, _getYearMonth.getYearMonthProps)(props);
      month = yearMonth.month;
      year = yearMonth.year;
    }

    _this.state = {
      year: year,
      month: month,
      selectedStartDate: null,
      highlightedDate: null,
      highlightRange: null,
      hideSelection: false,
      enabledRange: _this.getEnabledRange(props),
      dateStates: _this.getDateStates(props)
    };
    return _this;
  }

  (0, _createClass3.default)(DateRangePicker, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextDateStates = this.getDateStates(nextProps);
      var nextEnabledRange = this.getEnabledRange(nextProps);

      var updatedState = {
        selectedStartDate: null,
        hideSelection: false,
        dateStates: this.state.dateStates && _immutable2.default.is(this.state.dateStates, nextDateStates) ? this.state.dateStates : nextDateStates,
        enabledRange: this.state.enabledRange && this.state.enabledRange.isSame(nextEnabledRange) ? this.state.enabledRange : nextEnabledRange
      };

      if ((0, _hasUpdatedValue2.default)(this.props, nextProps)) {
        var isNewValueVisible = this.isStartOrEndVisible(nextProps);

        if (!isNewValueVisible) {
          var yearMonth = (0, _getYearMonth.getYearMonthProps)(nextProps);

          updatedState.year = yearMonth.year;
          updatedState.month = yearMonth.month;
        }
      }

      this.setState(updatedState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          PaginationArrowComponent = _props.paginationArrowComponent,
          className = _props.className,
          numberOfCalendars = _props.numberOfCalendars,
          stateDefinitions = _props.stateDefinitions,
          selectedLabel = _props.selectedLabel,
          showLegend = _props.showLegend,
          helpMessage = _props.helpMessage;


      var calendars = _immutable2.default.Range(0, numberOfCalendars).map(this.renderCalendar);
      className = this.cx({ element: null }) + ' ' + className;

      return _react2.default.createElement(
        'div',
        { className: className.trim() },
        _react2.default.createElement(PaginationArrowComponent, { direction: 'previous', onTrigger: this.moveBack, disabled: !this.canMoveBack() }),
        calendars.toJS(),
        _react2.default.createElement(PaginationArrowComponent, { direction: 'next', onTrigger: this.moveForward, disabled: !this.canMoveForward() }),
        helpMessage ? _react2.default.createElement(
          'span',
          { className: this.cx({ element: 'HelpMessage' }) },
          helpMessage
        ) : null,
        showLegend ? _react2.default.createElement(_Legend2.default, { stateDefinitions: stateDefinitions, selectedLabel: selectedLabel }) : null
      );
    }
  }]);
  return DateRangePicker;
}(_BemMixin3.default);

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.propTypes = {
  bemBlock: _propTypes2.default.string,
  bemNamespace: _propTypes2.default.string,
  className: _propTypes2.default.string,
  dateStates: _propTypes2.default.array, // an array of date ranges and their states
  defaultState: _propTypes2.default.string,
  disableNavigation: _propTypes2.default.bool,
  firstOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
  helpMessage: _propTypes2.default.string,
  initialDate: _propTypes2.default.instanceOf(Date),
  initialFromValue: _propTypes2.default.bool,
  initialMonth: _propTypes2.default.number, // Overrides values derived from initialDate/initialRange
  initialRange: _propTypes2.default.object,
  initialYear: _propTypes2.default.number, // Overrides values derived from initialDate/initialRange
  locale: _propTypes2.default.string,
  maximumDate: _propTypes2.default.instanceOf(Date),
  minimumDate: _propTypes2.default.instanceOf(Date),
  numberOfCalendars: _propTypes2.default.number,
  onHighlightDate: _propTypes2.default.func, // triggered when a date is highlighted (hovered)
  onHighlightRange: _propTypes2.default.func, // triggered when a range is highlighted (hovered)
  onSelect: _propTypes2.default.func, // triggered when a date or range is selectec
  onSelectStart: _propTypes2.default.func, // triggered when the first date in a range is selected
  paginationArrowComponent: _propTypes2.default.func,
  selectedLabel: _propTypes2.default.string,
  selectionType: _propTypes2.default.oneOf(['single', 'range']),
  singleDateRange: _propTypes2.default.bool,
  showLegend: _propTypes2.default.bool,
  stateDefinitions: _propTypes2.default.object,
  value: _CustomPropTypes2.default.momentOrMomentRange
};

DateRangePicker.defaultProps = function () {
  var date = new Date();
  var initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return {
    bemNamespace: null,
    bemBlock: 'DateRangePicker',
    className: '',
    numberOfCalendars: 1,
    firstOfWeek: 0,
    disableNavigation: false,
    nextLabel: '',
    previousLabel: '',
    initialDate: initialDate,
    initialFromValue: true,
    locale: moment().locale(),
    selectionType: 'range',
    singleDateRange: false,
    stateDefinitions: {
      '__default': {
        color: null,
        selectable: true,
        label: null
      }
    },
    selectedLabel: "Your selected dates",
    defaultState: '__default',
    dateStates: [],
    showLegend: false,
    onSelect: noop,
    paginationArrowComponent: _PaginationArrow2.default
  };
}();

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getEnabledRange = function (props) {
    var min = props.minimumDate ? moment(props.minimumDate).startOf('day') : absoluteMinimum;
    var max = props.maximumDate ? moment(props.maximumDate).startOf('day') : absoluteMaximum;

    return moment.range(min, max);
  };

  this.getDateStates = function (props) {
    var dateStates = props.dateStates,
        defaultState = props.defaultState,
        stateDefinitions = props.stateDefinitions;

    var actualStates = [];
    var minDate = absoluteMinimum;
    var maxDate = absoluteMaximum;
    var dateCursor = moment(minDate).startOf('day');

    var defs = _immutable2.default.fromJS(stateDefinitions);

    dateStates.forEach(function (s) {
      var r = s.range;
      var start = r.start.startOf('day');
      var end = r.end.startOf('day');

      if (!dateCursor.isSame(start, 'day')) {
        actualStates.push({
          state: defaultState,
          range: moment.range(dateCursor, start)
        });
      }
      actualStates.push(s);
      dateCursor = end;
    });

    actualStates.push({
      state: defaultState,
      range: moment.range(dateCursor, maxDate)
    });

    // sanitize date states
    return _immutable2.default.List(actualStates).map(function (s) {
      var def = defs.get(s.state);
      return _immutable2.default.Map({
        range: s.range,
        state: s.state,
        selectable: def.get('selectable', true),
        color: def.get('color')
      });
    });
  };

  this.isDateDisabled = function (date) {
    return !_this2.state.enabledRange.contains(date);
  };

  this.isDateSelectable = function (date) {
    return _this2.dateRangesForDate(date).some(function (r) {
      return r.get('selectable');
    });
  };

  this.nonSelectableStateRanges = function () {
    return _this2.state.dateStates.filter(function (d) {
      return !d.get('selectable');
    });
  };

  this.dateRangesForDate = function (date) {
    return _this2.state.dateStates.filter(function (d) {
      return d.get('range').contains(date);
    });
  };

  this.sanitizeRange = function (range, forwards) {
    /* Truncates the provided range at the first intersection
     * with a non-selectable state. Using forwards to determine
     * which direction to work
     */
    var blockedRanges = _this2.nonSelectableStateRanges().map(function (r) {
      return r.get('range');
    });
    var intersect = void 0;

    if (forwards) {
      intersect = blockedRanges.find(function (r) {
        return range.intersect(r);
      });
      if (intersect) {
        return moment.range(range.start, intersect.start);
      }
    } else {
      intersect = blockedRanges.findLast(function (r) {
        return range.intersect(r);
      });

      if (intersect) {
        return moment.range(intersect.end, range.end);
      }
    }

    if (range.start.isBefore(_this2.state.enabledRange.start)) {
      return moment.range(_this2.state.enabledRange.start, range.end);
    }

    if (range.end.isAfter(_this2.state.enabledRange.end)) {
      return moment.range(range.start, _this2.state.enabledRange.end);
    }

    return range;
  };

  this.highlightRange = function (range) {
    _this2.setState({
      highlightedRange: range,
      highlightedDate: null
    });
    if (typeof _this2.props.onHighlightRange === 'function') {
      _this2.props.onHighlightRange(range, _this2.statesForRange(range));
    }
  };

  this.onUnHighlightDate = function () {
    _this2.setState({
      highlightedDate: null
    });
  };

  this.onSelectDate = function (date) {
    var selectionType = _this2.props.selectionType;
    var selectedStartDate = _this2.state.selectedStartDate;


    if (selectionType === 'range') {
      if (selectedStartDate) {
        _this2.completeRangeSelection();
      } else if (!_this2.isDateDisabled(date) && _this2.isDateSelectable(date)) {
        _this2.startRangeSelection(date);
        if (_this2.props.singleDateRange) {
          _this2.highlightRange(moment.range(date, date));
        }
      }
    } else {
      if (!_this2.isDateDisabled(date) && _this2.isDateSelectable(date)) {
        _this2.completeSelection();
      }
    }
  };

  this.onHighlightDate = function (date) {
    var selectionType = _this2.props.selectionType;
    var selectedStartDate = _this2.state.selectedStartDate;


    var datePair = void 0;
    var range = void 0;
    var forwards = void 0;

    if (selectionType === 'range') {
      if (selectedStartDate) {
        datePair = _immutable2.default.List.of(selectedStartDate, date).sortBy(function (d) {
          return d.unix();
        });
        range = moment.range(datePair.get(0), datePair.get(1));
        forwards = range.start.unix() === selectedStartDate.unix();
        range = _this2.sanitizeRange(range, forwards);
        _this2.highlightRange(range);
      } else if (!_this2.isDateDisabled(date) && _this2.isDateSelectable(date)) {
        _this2.highlightDate(date);
      }
    } else {
      if (!_this2.isDateDisabled(date) && _this2.isDateSelectable(date)) {
        _this2.highlightDate(date);
      }
    }
  };

  this.startRangeSelection = function (date) {
    _this2.setState({
      hideSelection: true,
      selectedStartDate: date
    });
    if (typeof _this2.props.onSelectStart === 'function') {
      _this2.props.onSelectStart(moment(date));
    }
  };

  this.statesForDate = function (date) {
    return _this2.state.dateStates.filter(function (d) {
      return date.within(d.get('range'));
    }).map(function (d) {
      return d.get('state');
    });
  };

  this.statesForRange = function (range) {
    if (range.start.isSame(range.end, 'day')) {
      return _this2.statesForDate(range.start);
    }
    return _this2.state.dateStates.filter(function (d) {
      return d.get('range').intersect(range);
    }).map(function (d) {
      return d.get('state');
    });
  };

  this.completeSelection = function () {
    var highlightedDate = _this2.state.highlightedDate;
    if (highlightedDate) {
      _this2.setState({
        hideSelection: false,
        highlightedDate: null
      });
      _this2.props.onSelect(highlightedDate, _this2.statesForDate(highlightedDate));
    }
  };

  this.completeRangeSelection = function () {
    var range = _this2.state.highlightedRange;

    if (range && (!range.start.isSame(range.end, 'day') || _this2.props.singleDateRange)) {
      _this2.setState({
        selectedStartDate: null,
        highlightedRange: null,
        highlightedDate: null,
        hideSelection: false
      });
      _this2.props.onSelect(range, _this2.statesForRange(range));
    }
  };

  this.highlightDate = function (date) {
    _this2.setState({
      highlightedDate: date
    });
    if (typeof _this2.props.onHighlightDate === 'function') {
      _this2.props.onHighlightDate(date, _this2.statesForDate(date));
    }
  };

  this.getMonthDate = function () {
    return moment(new Date(_this2.state.year, _this2.state.month, 1));
  };

  this.isStartOrEndVisible = function (props) {
    var value = props.value,
        selectionType = props.selectionType,
        numberOfCalendars = props.numberOfCalendars;


    var isVisible = function isVisible(date) {
      var yearMonth = (0, _getYearMonth.getYearMonth)(date);
      var isSameYear = yearMonth.year === _this2.state.year;
      var isMonthVisible = yearMonth.month === _this2.state.month || numberOfCalendars === 2 && yearMonth.month - 1 === _this2.state.month;

      return isSameYear && isMonthVisible;
    };

    if (selectionType === 'single') {
      return isVisible(value);
    }

    return isVisible(value.start) || isVisible(value.end);
  };

  this.canMoveBack = function () {
    if (_this2.getMonthDate().subtract(1, 'days').isBefore(_this2.state.enabledRange.start)) {
      return false;
    }
    return true;
  };

  this.moveBack = function () {
    var monthDate = void 0;

    if (_this2.canMoveBack()) {
      monthDate = _this2.getMonthDate();
      monthDate.subtract(1, 'months');
      _this2.setState((0, _getYearMonth.getYearMonth)(monthDate));
    }
  };

  this.canMoveForward = function () {
    if (_this2.getMonthDate().add(_this2.props.numberOfCalendars, 'months').isAfter(_this2.state.enabledRange.end)) {
      return false;
    }
    return true;
  };

  this.moveForward = function () {
    var monthDate = void 0;

    if (_this2.canMoveForward()) {
      monthDate = _this2.getMonthDate();
      monthDate.add(1, 'months');
      _this2.setState((0, _getYearMonth.getYearMonth)(monthDate));
    }
  };

  this.changeYear = function (year) {
    var _state = _this2.state,
        enabledRange = _state.enabledRange,
        month = _state.month;


    if (moment({ years: year, months: month, date: 1 }).unix() < enabledRange.start.unix()) {
      month = enabledRange.start.month();
    }

    if (moment({ years: year, months: month + 1, date: 1 }).unix() > enabledRange.end.unix()) {
      month = enabledRange.end.month();
    }

    _this2.setState({
      year: year,
      month: month
    });
  };

  this.changeMonth = function (date) {
    _this2.setState({
      month: date
    });
  };

  this.renderCalendar = function (index) {
    var _props2 = _this2.props,
        bemBlock = _props2.bemBlock,
        bemNamespace = _props2.bemNamespace,
        firstOfWeek = _props2.firstOfWeek,
        numberOfCalendars = _props2.numberOfCalendars,
        selectionType = _props2.selectionType,
        value = _props2.value;
    var _state2 = _this2.state,
        dateStates = _state2.dateStates,
        enabledRange = _state2.enabledRange,
        hideSelection = _state2.hideSelection,
        highlightedDate = _state2.highlightedDate,
        highlightedRange = _state2.highlightedRange;

    var monthDate = _this2.getMonthDate();
    var year = monthDate.year();
    var month = monthDate.month();
    var key = index + '-' + year + '-' + month;
    var props = void 0;

    monthDate.add(index, 'months');

    var monthDates = _immutable2.default.fromJS((0, _datesInVisualMonth2.default)({ firstDayOfWeek: firstOfWeek, year: monthDate.year(), month: monthDate.month() }));
    var monthStart = monthDates.first().first();
    var monthEnd = monthDates.last().last();
    var monthRange = moment.range(monthStart, monthEnd);

    if (moment.isMoment(value)) {
      if (!monthRange.contains(value)) {
        value = null;
      }
    } else if ((0, _isMomentRange2.default)(value)) {
      if (!monthRange.overlaps(value)) {
        value = null;
      }
    }

    if (!moment.isMoment(highlightedDate) || !monthRange.contains(highlightedDate)) {
      highlightedDate = null;
    }

    if (!(0, _isMomentRange2.default)(highlightedRange) || !monthRange.overlaps(highlightedRange)) {
      highlightedRange = null;
    }

    props = {
      bemBlock: bemBlock,
      bemNamespace: bemNamespace,
      dateStates: dateStates,
      enabledRange: enabledRange,
      firstOfWeek: firstOfWeek,
      hideSelection: hideSelection,
      highlightedDate: highlightedDate,
      highlightedRange: highlightedRange,
      index: index,
      key: key,
      selectionType: selectionType,
      value: value,
      maxIndex: numberOfCalendars - 1,
      firstOfMonth: monthDate,
      onMonthChange: _this2.changeMonth,
      onYearChange: _this2.changeYear,
      onSelectDate: _this2.onSelectDate,
      onHighlightDate: _this2.onHighlightDate,
      onUnHighlightDate: _this2.onUnHighlightDate,
      dateRangesForDate: _this2.dateRangesForDate,
      dateComponent: _CalendarDate2.default,
      locale: _this2.props.locale
    };

    return _react2.default.createElement(_CalendarMonth2.default, props);
  };
};

exports.default = DateRangePicker;