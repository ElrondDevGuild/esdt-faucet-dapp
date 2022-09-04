export interface SCToken {
  identifier: string;
  name: string;
  owner: string;
  decimals: number;
  isPaused: boolean;
  transactions: number;
  accounts: number;
  canUpgrade: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canPause: boolean;
  canFreeze: boolean;
  canWipe: boolean;
  balance: string;
}
