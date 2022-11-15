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

export function truncateHeader(e: string | undefined) {
  if (e === undefined) {
    return 'Name or address not found';
  }
  if (e.slice(-3) === 'eth') {
    return e.slice(0, 15) + '...' + e.substring(e.length - 3);
  }
  if (e.slice(-4) === 'lens') {
    return e.slice(0, 15) + '...' + e.substring(e.length - 4);
  }
  if (e.slice(0, 2) === '0x') {
    return e.slice(0, 5) + '...' + e.substring(e.length - 5);
  } else return e;
}
