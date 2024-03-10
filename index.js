function calculateTargetRevenues(startDateStr, endDateStr, totalAnnualTarget) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(startDate);
  const daysWorkedExcludingFridays = calculateDaysExcludingFridays(startDate, endDate);
  const dailyTargetForMonth = calculateDailyTargetForMonth(startDate, totalAnnualTarget);
  const periodTarget = dailyTargetForMonth * daysWorkedExcludingFridays;

  // Return an object containing all the calculated values
  return {
      daysInMonthExcludingFridays,
      daysWorkedExcludingFridays,
      dailyTargetForMonth: periodTarget, // round to two decimal places
      periodTarget: periodTarget // round to two decimal places
  };
}

function calculateDaysExcludingFridays(startDate, endDate) {
  let count = 0;
  let date = new Date(startDate.getTime());

  while (date <= endDate) {
      if (date.getDay() !== 5) {
          count++;
      }
      date.setDate(date.getDate() + 1);
  }
  return count;
}
function calculateDaysInMonthExcludingFridays(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let firstDayOfMonth = new Date(year, month, 1);
  let lastDayOfMonth = new Date(year, month + 1, 0);
  let fridaysCount = 0;

  for (let current = new Date(firstDayOfMonth); current <= lastDayOfMonth; current.setDate(current.getDate() + 1)) {
      if (current.getDay() === 5) {
          fridaysCount++;
      }
  }

  return lastDayOfMonth.getDate() - fridaysCount;
}

function calculateDailyTargetForMonth(startDate, totalAnnualTarget) {
  let monthlyTarget = totalAnnualTarget / 12;
  let daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(startDate);
  return monthlyTarget / daysInMonthExcludingFridays;
}

// Example usage
const result = calculateTargetRevenues("2023-02-02", "2023-02-20", 5220);
console.log(result);