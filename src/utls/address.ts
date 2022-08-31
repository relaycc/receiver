export function truncateName(e: string | undefined) {
  if (e === undefined) {
    return 'ENS name or address not found';
  }
  if (e.length > 25) {
    return e.slice(0, 17) + '...' + e.substring(e.length - 4);
  } else return e;
}

export function truncateAddress(e: string | undefined) {
  if (e === undefined) {
    return 'Name or address not found';
  }
  return e.slice(0, 5) + '...' + e.substring(e.length - 5);
}
