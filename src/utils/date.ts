// All date related functions can be exported from here

export const shortDate = (d: Date | undefined): string => {
  if (!d) return 'N/A';
  const shortDateText = checkDateIsTodayOrYesterday(d);
  return shortDateText;
};

export const time = (d: Date | undefined): string => {
  if (!d) return 'N/A';
  const hour = d.getHours() % 12 || 12;
  const minute = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  return `${hour}:${minute}`;
};

const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const isBeforeDate = (
  dateToCheck: Date,
  dateToCheckAgainst: Date
): boolean => {
  dateToCheckAgainst.setHours(0, 0, 0, 0);
  return dateToCheck < dateToCheckAgainst;
};

function getDayName(date = new Date(), locale = 'en-US') {
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

export const setConversationTime = (dateToTransform: Date): string => {
  const checkToday = dateToTransform.getDay() === new Date().getDay();
  const checkYesterday =
    checkDateIsTodayOrYesterday(dateToTransform) === 'Yesterday';
  const withinAWeek = checkIfWithinAWeek(dateToTransform) === true;
  const day = dateToTransform.getDate().toString();
  const month = dateToTransform.getMonth().toString();
  const year = dateToTransform.getFullYear().toString();

  if (checkToday && withinAWeek) return formatAMPM(dateToTransform);
  if (checkYesterday) return 'Yesterday';
  if (!checkToday && !checkYesterday && withinAWeek) {
    return getDayName(dateToTransform);
  }
  return `${month}/${day}/${year}`;
};
``;

export const checkIfWithinAWeek = (someDate: Date) => {
  const today = new Date();
  const ifBetweenDates = Math.abs(someDate.getTime() - today.getTime());
  const daysBetween = ifBetweenDates / (24 * 60 * 60 * 1000);
  if (daysBetween < 7) {
    return true;
  } else {
    return false;
  }
};

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
