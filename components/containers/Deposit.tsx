import { Box, Spinner, Input, Stack, Text, Heading } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { BigUIntValue } from '@multiversx/sdk-core';
import {
  useConfig,
  useTokenTransfer,
  ScTokenTransferType,
} from '@useelven/core';
import { ActionButton } from '../tools/ActionButton';
import { shortenHash } from '../../utils/shortenHash';

const InputWrapper = ({ ...props }) => {
  return (
    <Input
      sx={{ ':focus-visible': { boxShadow: 'none', borderColor: 'unset' } }}
      {...props}
    />
  );
};

export const Deposit = () => {
  const { explorerAddress } = useConfig();
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');
  const [maxAmountPerDay, setMaxAmountPerDay] = useState('');
  const { pending, transfer, transaction } = useTokenTransfer();

  const handleDepositTx = useCallback(() => {
    if (
      !process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS ||
      !tokenId ||
      !amount ||
      !maxAmountPerDay
    )
      return;

    const limitArgument = new BigUIntValue(maxAmountPerDay);
    transfer({
      type: ScTokenTransferType.ESDTTransfer,
      tokenId,
      address: process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS,
      amount,
      gasLimit: 3000000,
      value: 0,
      endpointName: 'setLimit',
      endpointArgs: [limitArgument],
    });
    setTokenId('');
    setAmount('');
    setMaxAmountPerDay('');
  }, [amount, maxAmountPerDay, tokenId, transfer]);

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
        <Heading as="h5" size="md">
          Remember to use the wallet of the manager of the token.
        </Heading>
        <Text mb={4}>Token Id (ticker, for example: BUILDO-890d14)</Text>
        <InputWrapper
          placeholder="Token Id"
          size="lg"
          value={tokenId}
          onChange={handleTokenChange}
        />
        <Text mb={4}>
          Amount to deposit (for example 1000000000000000000 for 1 ESDT token
          with 18 decimal places)
        </Text>
        <InputWrapper
          placeholder="Amount to deposit"
          size="lg"
          value={amount}
          onChange={handleAmountChange}
        />
        <Text mb={4}>
          Max amount to claim per one address per day (for example
          1000000000000000000 for 1 ESDT token with 18 decimal places)
        </Text>
        <InputWrapper
          placeholder="Max amount to claim"
          size="lg"
          value={maxAmountPerDay}
          onChange={handleMaxClaimAmountChange}
        />
      </Stack>
      <Text mt={4}>
        Confirm the transaction using the auth provider method, and wait for
        transaction hash.
      </Text>
      <Stack direction="row" mt={4} alignItems="center">
        <ActionButton
          disabled={pending || !tokenId || !amount || !maxAmountPerDay}
          onClick={handleDepositTx}
        >
          Deposit
        </ActionButton>
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
