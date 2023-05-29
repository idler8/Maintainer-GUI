export default async (long: number) => {
  return new Promise((resolve) => setTimeout(resolve, long));
};
