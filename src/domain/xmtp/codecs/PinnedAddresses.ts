import { EthAddress, isEthAddress } from '../../eth';
import { ContentTypeId, ContentCodec, EncodedContent } from '@xmtp/xmtp-js';

export const PINNED_ADDRESSES_ID = new ContentTypeId({
  authorityId: 'relay.cc',
  typeId: 'PinnedAddresses',
  versionMajor: 3,
  versionMinor: 1,
});

export const PINNED_ADDRESS = '0x7239BA0AA4E14a437bbd0c30926Ac47Afa756A08';

export interface PinnedAddresses {
  addresses: EthAddress[];
}

export const isPinnedAddresses = (data: unknown): data is PinnedAddresses => {
  try {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    const pinnedAddresses = data as PinnedAddresses;
    if (!Array.isArray(pinnedAddresses.addresses)) {
      return false;
    }
    if (!pinnedAddresses.addresses.every((address) => isEthAddress(address))) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const addPinnedAddress = (
  pinnedAddresses: PinnedAddresses,
  address: EthAddress
): PinnedAddresses | null => {
  const addresses = [...pinnedAddresses.addresses];
  if (addresses.includes(address)) {
    return null;
  } else {
    addresses.push(address);
    return { addresses };
  }
};

export const removePinnedAddress = (
  pinnedAddresses: PinnedAddresses,
  address: EthAddress
): PinnedAddresses | null => {
  if (!pinnedAddresses.addresses.includes(address)) {
    return null;
  } else {
    const addresses = pinnedAddresses.addresses.filter((a) => a !== address);
    return { addresses };
  }
};

export class PinnedAddressesCodec implements ContentCodec<PinnedAddresses> {
  get contentType(): ContentTypeId {
    return PINNED_ADDRESSES_ID;
  }

  public encode(content: PinnedAddresses): EncodedContent {
    return {
      type: PINNED_ADDRESSES_ID,
      parameters: {},
      fallback: `This client does not support the content type ${this.contentType.toString()}. See https://xmtp.org/docs/dev-concepts/content-types for more details.`,
      content: new TextEncoder().encode(btoa(JSON.stringify(content))),
    };
  }

  public decode(content: EncodedContent): PinnedAddresses {
    const result = JSON.parse(
      atob(new TextDecoder().decode(content.content))
    ) as PinnedAddresses;
    if (!isPinnedAddresses(result)) {
      throw new Error('decode groups :: Invalid groups');
    } else {
      return result;
    }
  }
}
