import { AlchemyProvider } from '@ethersproject/providers';
const provider = new AlchemyProvider(
  'homestead',
  'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx'
);
export const useProvider = () => {
  return provider;
};
