export const findDeepValue = (obj: any, path: string) => {
  const arrayPath = path.split('.');
  for (let i = 0; i < arrayPath.length; i++) {
    obj = obj[arrayPath[i]];
  }
  return obj;
};
