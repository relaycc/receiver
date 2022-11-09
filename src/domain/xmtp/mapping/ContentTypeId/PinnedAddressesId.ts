import { PINNED_ADDRESSES_ID as NativePinnedAddressesId } from '../../codecs';

export const PINNED_ADDRESSES_ID = 'relay.cc/PinnedAddresses:1.1';

if (PINNED_ADDRESSES_ID !== NativePinnedAddressesId.toString()) {
  throw new Error('PINNED_ADDRESSES_ID does not match NativePinnedAddressesId');
}

export type PinnedAddressesId = typeof PINNED_ADDRESSES_ID;
