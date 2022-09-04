import { Box, Spinner, Input, Stack, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import {
  ContractFunction,
  BigUIntValue,
  BytesValue,
} from '@elrondnetwork/erdjs';
import { useScTransaction } from '../../hooks/core/useScTransaction';
import { networkConfig } from '../../config/network';
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
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');
  const [maxAmountPerDay, setMaxAmountPerDay] = useState('');
  const { pending, triggerTx, transaction } = useScTransaction();

  const handleDepositTx = useCallback(() => {
    if (
      !process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS ||
      !tokenId ||
      !amount ||
      !maxAmountPerDay
    )
      return;
    triggerTx({
      smartContractAddress:
        process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS,
      func: new ContractFunction('ESDTTransfer'),
      gasLimit: 3000000,
      args: [
        BytesValue.fromUTF8(tokenId),
        new BigUIntValue(amount),
        BytesValue.fromUTF8('setLimit'),
        new BigUIntValue(maxAmountPerDay),
      ],
      value: 0,
    });
    setTokenId('');
    setAmount('');
    setMaxAmountPerDay('');
  }, [amount, maxAmountPerDay, tokenId, triggerTx]);

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
        {transaction && process.env.NEXT_PUBLIC_ELROND_CHAIN ? (
          <Stack direction="row" ml={5}>
            <Text>Transaction details: </Text>
            <Text
              textDecoration="underline"
              as="a"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href={`${
                networkConfig[process.env.NEXT_PUBLIC_ELROND_CHAIN]
                  .explorerAddress
              }/transactions/${transaction.getHash().toString()}`}
            >
              {shortenHash(transaction.getHash().toString())}
            </Text>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};
