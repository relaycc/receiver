// All date related functions can be exported from here

export const shortDate = (d: Date | undefined): string => {
  if (!d) return 'N/A';
  const shortDateText = checkDateIsTodayOrYesterday(d);
  return shortDateText;
};

export const time = (d: Date | undefined): string => {
  if (!d) return 'N/A';
  let hour = d.getHours() % 12 || 12;
  let minute = (d.getMinutes()<10?'0':'') + d.getMinutes();
  //const formattedDayDate = d.toLocaleTimeString('en-us').replace('AM', '').replace('PM', '').replace(';', '.');

  return `${hour}.${minute}`;
};

export const isBeforeDate = (dateToCheck: Date, dateToCheckAgainst: Date): boolean => {
  dateToCheckAgainst.setHours(0, 0, 0, 0);
  return dateToCheck < dateToCheckAgainst;
}


const checkDateIsTodayOrYesterday = (someDate: Date) => {
  const dateWithoutTime = (d: Date) => new Date(d.toDateString());

  const today = dateWithoutTime(new Date());
  const yesterday = dateWithoutTime(new Date());

  yesterday.setDate(today.getDate() - 1);

  const comparisonDateTime = dateWithoutTime(someDate).getTime();

  if (
    comparisonDateTime > today.getTime() ||
    comparisonDateTime < yesterday.getTime()
  ) {
    return someDate.toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
    });
  } else if (comparisonDateTime === today.getTime()) {
    return `Today`;
  } else {
    return `Yesterday`;
  }
};
