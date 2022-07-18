// All date related functions can be exported from here

export const shortDate = (d: Date | undefined): string => {
  if (!d) return 'N/A';
  const shortDateText = checkDateIsTodayOrYesterday(d);
  return shortDateText;
};

const checkDateIsTodayOrYesterday = (someDate: Date) => {
  const dateWithoutTime = (d: Date) => new Date(d.toDateString());

  const today = dateWithoutTime(new Date());
  const yesterday = dateWithoutTime(new Date());

  yesterday.setDate(today.getDate() - 1);

  const comparisonDateTime = dateWithoutTime(someDate).getTime();

  const formattedDayDate = someDate.toLocaleTimeString('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (
    comparisonDateTime > today.getTime() ||
    comparisonDateTime < yesterday.getTime()
  ) {
    return someDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } else if (comparisonDateTime === today.getTime()) {
    return `Today at ${formattedDayDate}`;
  } else {
    return `Yesterday at ${formattedDayDate}`;
  }
};
