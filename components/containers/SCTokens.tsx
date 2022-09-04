import { useState } from 'react';
import { SCToken } from '../../types/scToken';
import { ClaimModal } from './ClaimModal';
import { ScTokensTable } from './SCTokensTable';
import { TxWebWalletPendingModal } from '../ui/TxWebWalletPendingModal';

export const ScTokens = () => {
  const [chosenToken, setChosenToken] = useState<SCToken | null>(null);
  const [modalClosed, setModalClosed] = useState(false);

  const handleChooseTokenToClaim = (token: SCToken) => () => {
    setChosenToken(token);
  };

  const handleOnClose = () => {
    setChosenToken(null);
    setModalClosed(true);
  };

  return (
    <>
      <TxWebWalletPendingModal onClose={handleOnClose} />
      <ScTokensTable
        txDone={modalClosed}
        handleChooseTokenToClaim={handleChooseTokenToClaim}
      />
      {Boolean(chosenToken) && (
        <ClaimModal
          tokenId={chosenToken?.identifier}
          tokenDecimals={chosenToken?.decimals}
          open={true}
          onClose={handleOnClose}
        />
      )}
    </>
  );
};
