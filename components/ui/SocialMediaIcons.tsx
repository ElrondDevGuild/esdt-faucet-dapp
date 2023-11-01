import { SocialIcon } from 'react-social-icons';
import { Box, Text } from '@chakra-ui/react';

export const SocialMediaIcons = () => {
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Text>Dapp</Text>
      <SocialIcon
        url="https://github.com/xdevguild/esdt-faucet-dapp"
        bgColor="#1d222a"
        style={{ width: 30, height: 30 }}
        title="ESDT Faucet Dapp"
      />
      <Text>SC</Text>
      <SocialIcon
        url="https://github.com/xdevguild/esdt-faucet-sc"
        bgColor="#1d222a"
        style={{ width: 30, height: 30 }}
        title="ESDT Faucet Smart Contract"
      />
    </Box>
  );
};
