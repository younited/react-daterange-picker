"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = datesInMonthFrom;
function datesInMonthFrom(firstDayOfWeek, year, month) {
  var rows = [],
      dates = [],
      i = 0,
      date = new Date(year, month, 1);

  while (date.getDay() !== (firstDayOfWeek || 0)) {
    date.setDate(date.getDate() - 1);
  }

  do {
    for (i = 0; i < 7; i++) {
      dates.push(date);
      date = new Date(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    rows.push(dates);
    dates = [];
  } while (date.getMonth() <= month && date.getFullYear() === year);

  return rows;
}