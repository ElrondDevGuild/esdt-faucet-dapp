// Used mainly for Web Wallet confirmations after redirection
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { networkConfig } from '../../config/network';
import { useEffectOnlyOnUpdate } from '../../hooks/tools/useEffectOnlyOnUpdate';
import { shortenHash } from '../../utils/shortenHash';
import { useScTransaction } from '../../hooks/core/useScTransaction';

const CustomModalOverlay = () => {
  return <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />;
};

export const TxWebWalletPendingModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { isOpen, onOpen, onClose: close } = useDisclosure({ onClose });
  const { pending, transaction } = useScTransaction(); // Web Wallet state

  useEffectOnlyOnUpdate(() => {
    if (pending) {
      onOpen();
    }
  }, [pending]);

  const transactionHash = transaction?.getHash().toString();

  return (
    <>
      <Modal isOpen={isOpen} size="sm" onClose={close} isCentered>
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
            <Text textAlign="center" fontWeight="black" fontSize="xl">
              Transaction status
            </Text>
            {transactionHash && process.env.NEXT_PUBLIC_ELROND_CHAIN ? (
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
                  }/transactions/${transactionHash}`}
                >
                  {shortenHash(transactionHash)}
                </Text>
              </>
            ) : (
              <>
                <Text textAlign="center" mb={3}>
                  Transaction pending. Please wait for the transaction hash.
                </Text>
                <Spinner />
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
