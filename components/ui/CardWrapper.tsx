import { Box, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const CardWrapper: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  return (
    <Box
      backgroundColor="dappTemplate.dark.darker"
      padding={8}
      borderRadius="2xl"
      {...props}
    >
      {children}
    </Box>
  );
};
