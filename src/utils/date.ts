export const getDisplayDate = (date: Date): string => {
  const time = date.getTime();
  const midnight = new Date().setHours(0, 0, 0);
  if (time > midnight) {
    return date.toLocaleString('en-US', { timeStyle: 'short' });
  } else if (time > midnight - 24 * 60 * 60 * 1000) {
    return 'Yesterday';
  } else if (time > midnight - 24 * 60 * 60 * 1000 * 7) {
    return date.toLocaleString('en-US', { weekday: 'long' });
  } else {
    return date.toLocaleString('en-US', { dateStyle: 'short' });
  }
};
