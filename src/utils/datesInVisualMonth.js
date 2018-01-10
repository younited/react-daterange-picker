const DAYS_IN_WEEK = 7
const DAY = 24 * 60 * 60 * 1000

const getFirstDateOfMonthsFirstWeek = ({date, firstDayOfWeek}) => {
  const dateCopy = new Date(date.getTime())

  while (dateCopy.getDay() !== firstDayOfWeek) {
    dateCopy.setDate(dateCopy.getDate() - 1);
  }

  return dateCopy
}

const isWeekWithinVisibleCalendarMonth = ({date, week, year, month}) => {
  const firstOfWeek = new Date(date.getTime() + week * DAYS_IN_WEEK * DAY)
  return (firstOfWeek.getMonth() <= month) && (firstOfWeek.getFullYear() === year)
}

const getDaysInWeek = ({date, week}) => (
  [0,1,2,3,4,5,6].map((wday) => (
    new Date(
      date.getTime() + (wday + (week * DAYS_IN_WEEK)) * DAY
    )
  ))
)

const datesInVisualMonth = ({year, month, firstDayOfWeek = 1}) => {
  const firstOfMonth = new Date(year, month, 1, 14, 0)

  let calendar = [],
    date = getFirstDateOfMonthsFirstWeek({date: firstOfMonth, firstDayOfWeek})

  for (
    let week = 0;
    week === 0 ||
      isWeekWithinVisibleCalendarMonth({date, week, year, month});
    week++
  ) {
    calendar[week] = getDaysInWeek({week, date})
  }

  return calendar
}


export {getFirstDateOfMonthsFirstWeek}
export default datesInVisualMonth