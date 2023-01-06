import type { NextPage } from 'next';
import {
  Text,
  Flex,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { MainLayout } from '../components/ui/MainLayout';
import { HeaderMenu } from '../components/ui/HeaderMenu';
import { HeaderMenuButtons } from '../components/ui/HeaderMenuButtons';
import { Authenticated } from '../components/tools/Authenticated';
import { CardWrapper } from '../components/ui/CardWrapper';
import { LoginModalButton } from '../components/tools/LoginModalButton';
import { ScTokens } from '../components/containers/SCTokens';
import { Deposit } from '../components/containers/Deposit';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth']} />
      </HeaderMenu>
      <CardWrapper mb={4} textAlign="center">
        <Text mb={4}>
          ESDT faucet is a dApp that connects with the{' '}
          <Link
            textDecoration="underline"
            href="https://github.com/xdevguild/esdt-faucet-sc"
          >
            ESDT Faucet Smart Contract
          </Link>
        </Text>
        <Text mb={4}>What is ESDT Faucet?</Text>
        <Text>
          The ESDT Faucet is a simple tool that allows you to deposit fungible
          ESDT tokens on a smart contract and let your testers claim them to be
          able to test your projects on the devnet.
        </Text>
        <Text>
          For now, it works only on the devnet. Connect your wallet and deposit
          or claim ESDT tokens!
        </Text>
      </CardWrapper>
      <CardWrapper>
        <Authenticated
          spinnerCentered
          fallback={
            <>
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                Connect your wallet!
              </Text>
              <Flex mt={4} justifyContent="center">
                <LoginModalButton />
              </Flex>
            </>
          }
        >
          <Tabs colorScheme="whatsapp">
            <TabList>
              <Tab>Claim</Tab>
              <Tab>Deposit</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ScTokens />
              </TabPanel>
              <TabPanel>
                <Deposit />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Authenticated>
      </CardWrapper>
    </MainLayout>
  );
};

export default Home;
