export function getCalenderData (year, monthIndex) {
      const monthName = [
    "January",
   " February",
    "March",
   " April",
   " May",
    "June",
    "July",
    "August",
    "September",
   " October",
    "November",
   " December",
  ];
const monthNames = monthName [monthIndex]
const daysInMonth = new Date( year, monthIndex +1, 0).getDate();
const startWeekday = new Date (year,monthIndex, 1).getDay();

return{
    year,
    month: monthNames,
    daysInMonth,
    startWeekday,
};


}

