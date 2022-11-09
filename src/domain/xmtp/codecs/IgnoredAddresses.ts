import { ContentTypeId, EncodedContent, ContentCodec } from '@xmtp/xmtp-js';
import { EthAddress, isEthAddress } from '../../eth';

export const IGNORED_ADDRESSES_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'IgnoredAddresses',
  versionMajor: 3,
  versionMinor: 1,
});

export const IGNORED_ADDRESS = '0x6722C94979d942CFcF1EB0748AA883660c42c0F4';

export interface IgnoredAddresses {
  addresses: EthAddress[];
}

export const isIgnoredAddresses = (data: unknown): data is IgnoredAddresses => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const ignoredAddresses = data as IgnoredAddresses;
  if (!Array.isArray(ignoredAddresses.addresses)) {
    return false;
  }
  if (!ignoredAddresses.addresses.every((address) => isEthAddress(address))) {
    return false;
  }
  return true;
};

export const addIgnoredAddress = (
  ignoredAddresses: IgnoredAddresses,
  address: EthAddress
): IgnoredAddresses | null => {
  const addresses = [...ignoredAddresses.addresses];
  if (addresses.includes(address)) {
    return null;
  } else {
    addresses.push(address);
    return { addresses };
  }
};

export const removeIgnoredAddress = (
  ignoredAddresses: IgnoredAddresses,
  address: EthAddress
): IgnoredAddresses | null => {
  if (!ignoredAddresses.addresses.includes(address)) {
    return null;
  } else {
    const addresses = ignoredAddresses.addresses.filter((a) => a !== address);
    return { addresses };
  }
};

export class IgnoredAddressesCodec implements ContentCodec<IgnoredAddresses> {
  get contentType(): ContentTypeId {
    return IGNORED_ADDRESSES_ID;
  }

  public encode(content: IgnoredAddresses): EncodedContent {
    return {
      type: IGNORED_ADDRESSES_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent): IgnoredAddresses {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as IgnoredAddresses;
    if (!isIgnoredAddresses(result)) {
      throw new Error('decode groups :: Invalid groups');
    } else {
      return result;
    }
  }
}
