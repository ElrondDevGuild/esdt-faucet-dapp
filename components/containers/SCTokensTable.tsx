import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useApiCall } from '@useelven/core';
import { useEffectOnlyOnUpdate } from '../../hooks/useEffectOnlyOnUpdate';
import { SCToken } from '../../types/scToken';
import { denominate } from '../../utils/denominate';
import { ActionButton } from '../tools/ActionButton';

interface ScTokensTable {
  handleChooseTokenToClaim: (token: SCToken) => () => void;
  txDone: boolean;
}

export const ScTokensTable: FC<ScTokensTable> = ({
  handleChooseTokenToClaim,
  txDone,
}) => {
  const { data, isLoading, fetch } = useApiCall<SCToken[]>({
    url: `/accounts/${process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS}/tokens`,
    autoInit: true,
    type: 'get',
  });

  useEffectOnlyOnUpdate(() => {
    if (txDone) {
      fetch();
    }
  }, [txDone]);

  if (isLoading)
    <Flex justify="center">
      <Spinner
        thickness="3px"
        speed="0.4s"
        color="dappTemplate.color2.base"
        size="md"
        mt={3}
      />
    </Flex>;

  return (
    <TableContainer>
      <Table size="sm" variant="unstyled ">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Token Id</Th>
            <Th>Amount</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((token) => (
            <Tr key={token.identifier}>
              <Td>{token.name}</Td>
              <Td>{token.identifier}</Td>
              <Td>{denominate(token.balance, token.decimals)}</Td>
              <Td textAlign="right">
                <ActionButton onClick={handleChooseTokenToClaim(token)}>
                  Claim
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
