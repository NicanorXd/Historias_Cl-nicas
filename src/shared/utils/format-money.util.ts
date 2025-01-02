export function formatMoneyUtil(value: number, decimal = 2) {
  return parseFloat(`${value}`).toLocaleString(undefined, {
    maximumFractionDigits: decimal,
    minimumFractionDigits: decimal,
  });
}
