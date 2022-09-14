import { EnsName, Address, EnsAvatar } from '../hooks/types';

const nameCache: Record<string, EnsName | undefined> = {};
const addressCache: Record<string, Address | undefined> = {};
const avatarCache: Record<string, EnsAvatar | undefined> = {};

export const setName = (address: string, name: EnsName) => {
  nameCache[address] = name;
  document.dispatchEvent(new CustomEvent(address + 'ens cache update'));
  if (typeof name.name === 'string') {
    addressCache[name.name] = { status: 'settled', address };
    document.dispatchEvent(
      new CustomEvent(address + 'ens address cache update')
    );
  }
};

export const getName = (address?: string | null) => {
  if (typeof address === 'string') {
    return nameCache[address];
  } else {
    return undefined;
  }
};

export const setAddress = (name: string, address: Address) => {
  addressCache[name] = address;
  document.dispatchEvent(new CustomEvent(name + 'ens address cache update'));
  if (typeof address.address === 'string') {
    nameCache[address.address] = { status: 'settled', name };
    document.dispatchEvent(new CustomEvent(name + 'ens address cache update'));
  }
};

export const getAddress = (name: string) => {
  return addressCache[name];
};

export const setEnsAvatar = (name: string, avatar: EnsAvatar) => {
  avatarCache[name] = avatar;
  document.dispatchEvent(new CustomEvent(name + 'ens avatar cache update'));
  const cachedAddress = addressCache[name];
  if (cachedAddress && typeof cachedAddress.address === 'string') {
    avatarCache[cachedAddress.address] = avatar;
    document.dispatchEvent(
      new CustomEvent(cachedAddress.address + 'ens avatar cache update')
    );
  }
};

export const getEnsAvatar = (name: string) => {
  return avatarCache[name];
};
