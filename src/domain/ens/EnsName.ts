type EnsSuffix = '.eth';
export type EnsName = `${string}${EnsSuffix}`;

export const isEnsName = (name: unknown): name is EnsName => {
  if (typeof name !== 'string') {
    return false;
  }
  if (name.length < 7) {
    return false;
  }
  if (!name.endsWith('.eth')) {
    return false;
  }
  return true;
};
