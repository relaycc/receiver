type LensSuffix = '.lens';
export type LensName = `${string}${LensSuffix}`;

export const isLensName = (name: unknown): name is LensName => {
  if (typeof name !== 'string') {
    return false;
  }
  if (name.length < 9 || name.length > 37) {
    return false;
  }
  if (!name.endsWith('.lens')) {
    return false;
  }
  return true;
};
