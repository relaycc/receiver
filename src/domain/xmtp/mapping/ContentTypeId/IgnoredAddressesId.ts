import { IGNORED_ADDRESSES_ID as NativeIgnoredAddressesId } from '../../codecs';

export const IGNORED_ADDRESSES_ID = 'relay.cc/IgnoredAddresses:1.1';

if (IGNORED_ADDRESSES_ID !== NativeIgnoredAddressesId.toString()) {
  throw new Error(
    'IGNORED_ADDRESSES_ID does not match NativeIgnoredAddressesId'
  );
}

export type IgnoredAddressesId = typeof IGNORED_ADDRESSES_ID;
