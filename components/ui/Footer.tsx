import { Container, Box, Text } from '@chakra-ui/react';
import packageJson from '../../package.json';

export const Footer = () => {
  return (
    <Box
      height="120px"
      bgColor="dappTemplate.dark.darker"
      color="dappTemplate.white"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>Elrond ESDT Faucet (v{`${packageJson.version}`})</Box>
        <Box fontSize="xs" fontWeight="hairline">
          Check out all the projects below. All projects for free. Please
          support all of them. Give them a credit, star them on GitHub and tell
          the world about them.
        </Box>
        <Box fontSize="xs" fontWeight="bold">
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElrondDevGuild"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {"Elrond's Dev Guild"}
          </Text>
          {' - '}
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElvenTools"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Elven Tools'}
          </Text>
          {' - '}
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/juliancwirko/elven.js"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Elven.js'}
          </Text>
          {' - '}
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElrondDevGuild/nextjs-dapp-template"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Nextjs Dapp Template'}
          </Text>
          {' - '}
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://github.com/ElrondDevGuild/buildo-begins"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Buildo Begins'}
          </Text>
        </Box>
        <Box fontSize="xs" fontWeight="bold">
          <Text
            as="a"
            color="dappTemplate.color3.base"
            href="https://www.julian.io"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {'Julian.io'}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
