import { SocialIcon } from 'react-social-icons';
import { Box, Text } from '@chakra-ui/react';

export const SocialMediaIcons = () => {
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Text>Dapp</Text>
      <SocialIcon
        url="https://github.com/ElrondDevGuild/esdt-faucet-dapp"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
        title="ESDT Faucet Dapp"
      />
      <Text>SC</Text>
      <SocialIcon
        url="https://github.com/ElrondDevGuild/esdt-faucet-sc"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
        title="ESDT Faucet Smart Contract"
      />
    </Box>
  );
};
