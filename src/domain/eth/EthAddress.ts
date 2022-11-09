type EthPrefix = '0x';
export type EthAddress = `${EthPrefix}${string}`;

export const isEthAddress = (address: unknown): address is EthAddress => {
  if (typeof address !== 'string') {
    return false;
  }
  if (!address.startsWith('0x')) {
    return false;
  }
  if (!address.match(/^0x[0-9a-fA-F]{40}$/)) {
    return false;
  }
  return true;
};
