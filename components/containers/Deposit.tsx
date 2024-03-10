import { Box, Spinner, Input, Stack, Text, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { BigUIntValue, TokenTransfer } from '@multiversx/sdk-core';
import { useConfig, useTokenTransfer, ESDTType } from '@useelven/core';
import { ActionButton } from '../tools/ActionButton';
import { shortenHash } from '../../utils/shortenHash';
import { Authenticated } from '../tools/Authenticated';

const InputWrapper = ({ ...props }) => {
  return (
    <Input
      sx={{ ':focus-visible': { boxShadow: 'none', borderColor: 'unset' } }}
      {...props}
    />
  );
};

export const Deposit = () => {
  const { explorerAddress, apiAddress } = useConfig();
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');
  const [maxAmountPerDay, setMaxAmountPerDay] = useState('');
  const { pending, transfer, transaction } = useTokenTransfer();

  const handleDepositTx = async () => {
    if (
      !process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS ||
      !tokenId ||
      !amount ||
      !maxAmountPerDay
    )
      return;

    const response = await fetch(`${apiAddress}/tokens/${tokenId.trim()}`);
    const data = await response.json();
    const tokenTransfer = TokenTransfer.fungibleFromAmount(
      tokenId,
      maxAmountPerDay,
      data.decimals
    );

    transfer({
      type: ESDTType.FungibleESDT,
      tokenId,
      receiver: process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS,
      amount,
      gasLimit: 3000000,
      endpointName: 'setLimit',
      endpointArgs: [new BigUIntValue(tokenTransfer.amountAsBigInteger)],
    });
    setTokenId('');
    setAmount('');
    setMaxAmountPerDay('');
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTokenId(event.target.value);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(event.target.value);

  const handleMaxClaimAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setMaxAmountPerDay(event.target.value);

  return (
    <Box>
      <Stack spacing={3}>
        <Heading as="h5" size="md" mb={4}>
          Remember to use the wallet of the manager of the token.
        </Heading>
        <Text>Token Id (ticker, for example: BUILDO-890d14)</Text>
        <InputWrapper
          placeholder="Token Id"
          size="lg"
          value={tokenId}
          mb={4}
          onChange={handleTokenChange}
        />
        <Text>
          Amount to deposit (for example 1 for 1 ESDT token, don&apos;t worry
          about decimal places.)
        </Text>
        <InputWrapper
          placeholder="Amount to deposit"
          size="lg"
          value={amount}
          mb={4}
          onChange={handleAmountChange}
        />
        <Text>
          Max amount to claim per one address per day (for example 1 for 1 ESDT
          token, don&apos;t worry about decimal places.)
        </Text>
        <InputWrapper
          placeholder="Max amount to claim"
          size="lg"
          value={maxAmountPerDay}
          mb={4}
          onChange={handleMaxClaimAmountChange}
        />
      </Stack>
      <Text mt={4}>
        Confirm the transaction using the auth provider method, and wait for
        transaction hash.
      </Text>
      <Stack direction="row" mt={4} alignItems="center">
        <Authenticated noSpinner fallback={<div>Connect your wallet</div>}>
          <ActionButton
            disabled={pending || !tokenId || !amount || !maxAmountPerDay}
            onClick={handleDepositTx}
          >
            Deposit
          </ActionButton>
        </Authenticated>
        {pending && <Spinner ml={5} />}
        {transaction && process.env.NEXT_PUBLIC_MULTIVERSX_CHAIN ? (
          <Stack direction="row" ml={5}>
            <Text>Transaction details: </Text>
            <Text
              textDecoration="underline"
              as="a"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={`${explorerAddress}/transactions/${transaction
                .getHash()
                .toString()}`}
            >
              {shortenHash(transaction.getHash().toString())}
            </Text>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};
