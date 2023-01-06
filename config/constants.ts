// This configuration file keeps all UI constants and settings

// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: 'MultiversX ESDT Faucet - MultiversX blockchain',
  description:
    'MultiversX ESDT Faucet - you can claim and deposit ESDT tokens using a smart contract',
  image: `${dappHostname}/og-image.png`,
};
