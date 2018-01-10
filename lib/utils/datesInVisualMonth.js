"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DAYS_IN_WEEK = 7;
var DAY = 24 * 60 * 60 * 1000;

var getFirstDateOfMonthsFirstWeek = function getFirstDateOfMonthsFirstWeek(_ref) {
  var date = _ref.date,
      firstDayOfWeek = _ref.firstDayOfWeek;

  var dateCopy = new Date(date.getTime());

  while (dateCopy.getDay() !== firstDayOfWeek) {
    dateCopy.setDate(dateCopy.getDate() - 1);
  }

  return dateCopy;
};

var isWeekWithinVisibleCalendarMonth = function isWeekWithinVisibleCalendarMonth(_ref2) {
  var date = _ref2.date,
      week = _ref2.week,
      year = _ref2.year,
      month = _ref2.month;

  var firstOfWeek = new Date(date.getTime() + week * DAYS_IN_WEEK * DAY);
  return firstOfWeek.getMonth() <= month && firstOfWeek.getFullYear() === year;
};

var getDaysInWeek = function getDaysInWeek(_ref3) {
  var date = _ref3.date,
      week = _ref3.week;
  return [0, 1, 2, 3, 4, 5, 6].map(function (wday) {
    return new Date(date.getTime() + (wday + week * DAYS_IN_WEEK) * DAY);
  });
};

var datesInVisualMonth = function datesInVisualMonth(_ref4) {
  var year = _ref4.year,
      month = _ref4.month,
      _ref4$firstDayOfWeek = _ref4.firstDayOfWeek,
      firstDayOfWeek = _ref4$firstDayOfWeek === undefined ? 1 : _ref4$firstDayOfWeek;

  var firstOfMonth = new Date(year, month, 1, 14, 0);

  var calendar = [],
      date = getFirstDateOfMonthsFirstWeek({ date: firstOfMonth, firstDayOfWeek: firstDayOfWeek });

  for (var week = 0; week === 0 || isWeekWithinVisibleCalendarMonth({ date: date, week: week, year: year, month: month }); week++) {
    calendar[week] = getDaysInWeek({ week: week, date: date });
  }

  return calendar;
};

exports.getFirstDateOfMonthsFirstWeek = getFirstDateOfMonthsFirstWeek;
exports.default = datesInVisualMonth;