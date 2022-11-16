export function truncateName(e: string | undefined | null) {
  if (e === undefined || e === null) {
    return 'ENS name or address not found';
  }
  if (e.length > 25) {
    return e.slice(0, 19) + '...' + e.substring(e.length - 3);
  } else return e;
}

export function truncateLens(e: string | undefined) {
  if (e === undefined) {
    return 'Lens name or address not found';
  }
  if (e.length > 25) {
    return e.slice(0, 18) + '...' + e.substring(e.length - 4);
  } else return e;
}

export function truncateAddress(e: string | undefined | null) {
  if (e === undefined || e === null) {
    return 'Name or address not found';
  }
  return e.slice(0, 5) + '...' + e.substring(e.length - 5);
}
