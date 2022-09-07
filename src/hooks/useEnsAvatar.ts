export const useEnsAvatar = ({
  addressOrName,
}: {
  addressOrName: string | undefined;
}) => {
  console.log(addressOrName);
  return {
    data: 'https://prod-metadata.s3.amazonaws.com/images/1859.png',
    isLoading: false,
    isFetching: false,
  };
};
