import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Box,
} from '@chakra-ui/react';
import {
  ContractFunction,
  BigUIntValue,
  BytesValue,
} from '@elrondnetwork/erdjs';
import { FC, useCallback } from 'react';
import { useScQuery, SCQueryType } from '../../hooks/core/useScQuery';
import { useScTransaction } from '../../hooks/core/useScTransaction';
import { ActionButton } from '../tools/ActionButton';
import { denominate } from '../../utils/denominate';
import { networkConfig } from '../../config/network';
import { shortenHash } from '../../utils/shortenHash';

interface ClaimModalProps {
  tokenId?: string;
  tokenDecimals?: number;
  open: boolean;
  onClose: () => void;
}

const CustomModalOverlay = () => {
  return <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />;
};

export const ClaimModal: FC<ClaimModalProps> = ({
  tokenId,
  tokenDecimals,
  open,
  onClose,
}) => {
  const { data: queryResult } = useScQuery<number>({
    type: SCQueryType.NUMBER,
    payload: {
      scAddress: process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS,
      funcName: 'getMaxTokensPerTransaction',
      args: tokenId ? [Buffer.from(tokenId, 'ascii').toString('hex')] : [],
    },
    autoInit: Boolean(open && tokenId),
  });

  const { pending, triggerTx, transaction } = useScTransaction();

  const handleClaimTx = useCallback(() => {
    if (
      !tokenId ||
      !process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS ||
      !queryResult
    )
      return;
    triggerTx({
      smartContractAddress:
        process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS,
      func: new ContractFunction('claim'),
      gasLimit: 3000000,
      args: [
        BytesValue.fromUTF8(tokenId.trim()),
        new BigUIntValue(queryResult),
      ],
      value: 0,
    });
  }, [queryResult, tokenId, triggerTx]);

  return (
    <>
      <Modal isOpen={open} size="sm" onClose={onClose} isCentered>
        <CustomModalOverlay />
        <ModalContent
          bgColor="dappTemplate.dark.darker"
          px={6}
          pt={7}
          pb={7}
          position="relative"
        >
          <ModalCloseButton _focus={{ outline: 'none' }} />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Text textAlign="center" mb={7} fontWeight="black" fontSize="xl">
              Claim {tokenId}
            </Text>
            <Text textAlign="center">
              Claim{' '}
              <strong>
                {tokenDecimals
                  ? denominate(queryResult.toString(), tokenDecimals)
                  : '-'}
              </strong>{' '}
              tokens. This is the maximum per one transaction set on smart
              contract.
            </Text>
            <Text textAlign="center">
              You can make one transaction per <strong>24 hours</strong>.
            </Text>
            <ActionButton mt={5} onClick={handleClaimTx} disabled={pending}>
              Claim
            </ActionButton>
            {transaction && process.env.NEXT_PUBLIC_ELROND_CHAIN && (
              <>
                <Text mt={3}>Transaction details:</Text>
                <Text
                  textDecoration="underline"
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={`${
                    networkConfig[process.env.NEXT_PUBLIC_ELROND_CHAIN]
                      .explorerAddress
                  }/transactions/${transaction?.getHash().toString()}`}
                >
                  {shortenHash(transaction?.getHash().toString())}
                </Text>
              </>
            )}
          </ModalBody>
          {pending && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              inset={0}
              position="absolute"
              width="100%"
              height="100%"
              bgColor="dappTemplate.dark.darker"
            >
              <Box
                maxWidth="70%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text textAlign="center" mb={3}>
                  Confirm the transaction using the auth provider method, and
                  wait for transaction hash.
                </Text>
                <Spinner />
              </Box>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
