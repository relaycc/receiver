import { AlchemyProvider, CloudflareProvider } from '@ethersproject/providers';
const cfProvider = new CloudflareProvider();
const alchemyProvider = new AlchemyProvider(
  'homestead',
  'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx'
);

export const useProvider = () => {
  return Math.random() < 0.5 ? cfProvider : alchemyProvider;
};
