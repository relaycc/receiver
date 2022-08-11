
export const truncated = (str: string):string => {
  if (str.length < 13) {
    return str;
  } else {
    return str.slice(0, 6) + '...' + str.slice(-4);
  }
}