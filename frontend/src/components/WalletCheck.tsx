import React, { useState, useEffect } from 'react';

const WalletCheck: React.FC<{ onWalletConnected: (address: string) => void }> = ({ onWalletConnected }) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletConnected(true);
            onWalletConnected(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();
  }, [onWalletConnected]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          onWalletConnected(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <p>{walletConnected ? 'Wallet is connected' : 'Wallet is not connected'}</p>
      {walletConnected ? (
        <p>Wallet connected</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletCheck;
