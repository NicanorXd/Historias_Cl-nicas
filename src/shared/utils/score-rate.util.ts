export function scoreRateUtil() {
  return parseFloat(process.env.CONFIG_SCORE_RATE || '0.5');
}
