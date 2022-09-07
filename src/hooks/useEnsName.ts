export const useEnsName = ({ address }: { address: string | undefined }) => {
  console.log(address);
  return {
    data: 'killthebuddha.eth',
    isLoading: false,
    isFetching: false,
    isError: false,
  };
};
