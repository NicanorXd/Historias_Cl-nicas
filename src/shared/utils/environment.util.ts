export function getAppUrl() {
  return process.env.APP_URL || '';
}

export function getCoinpaymentApi() {
  return process.env.CONFIG_COINPAYMENT_API || '';
}

export function getConfigUserTask() {
  return process.env.CONFIG_USER_TASK || '0 0 * * *';
}
