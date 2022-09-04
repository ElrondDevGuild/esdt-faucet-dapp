import BigNumber from 'bignumber.js';

export const denominate = (tokenBalance: string, tokenDecimals: number) => {
  return new BigNumber(tokenBalance)
    .dividedBy(new BigNumber(Math.pow(10, tokenDecimals)))
    .toString();
};
