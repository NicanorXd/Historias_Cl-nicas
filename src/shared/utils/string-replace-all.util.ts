export function stringReplaceAllUtil(
  value: string,
  stringSearch: string,
  stringReplace: string,
): string {
  const regx = new RegExp(`/${stringSearch}/g`);
  return value.replace(regx, stringReplace);
}
