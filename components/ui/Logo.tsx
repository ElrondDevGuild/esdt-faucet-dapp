import NextLink from 'next/link';
import { Box, Text } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <NextLink href="/">
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        position="relative"
        userSelect="none"
      >
        <Text
          as="span"
          cursor="pointer"
          mb={0}
          fontSize="4xl"
          fontWeight="black"
          color="dappTemplate.white"
        >
          MultiversX ESDT Faucet
        </Text>
        <Text
          fontSize="small"
          position="absolute"
          right={0}
          top={-2}
          color="dappTemplate.color3.base"
        >
          {process.env.NEXT_PUBLIC_ELROND_CHAIN}
        </Text>
      </Box>
    </NextLink>
  );
};
