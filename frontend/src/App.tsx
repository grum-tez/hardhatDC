import React, { useState, useEffect } from 'react';
import { getContract } from './contractService';
import ChampionSelection from './components/ChampionSelection';
import ChallengerDashboard from './components/ChallengerDashboard';
import { fetchChampionMap, Champion } from './fetchChampionMap';
import WalletCheck from './components/WalletCheck';
import './App.css';

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setwalletAddress] = useState<string>('');

  const handleWalletConnected = (address: string) => {
    setwalletAddress(address);
    setWalletConnected(true);
    // checkIfRegisteredChallenger(address);
  };

  // const checkIfRegisteredChallenger = async (address: string) => {
  //   if (!address) {
  //     setIsRegisteredChallenger(false);
  //     return;
  //   }

  //   try {
  //     const contract = await getContract();
  //     const challengerData = await contract.getChallenger(address);
  //     const currentChampionId = challengerData[0];
  //     setFightRecords(challengerData[1]);
  //     if (currentChampionId) {
  //       setIsRegisteredChallenger(true);
  //       setMessage(`Registered as challenger. Current Champion ID: ${currentChampionId || 'N/A'}`);
  //       setCurrentChampionId(currentChampionId);
  //     } else {
  //       setCurrentChampionId(currentChampionId);
  //       setMessage(`Not registered as challenger.`);
  //       setIsRegisteredChallenger(false);
  //     }
  //   } catch (error) {
  //     console.error('Error checking if registered challenger:', error);
  //     setIsRegisteredChallenger(false);
  //   }
  // };

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [isRegisteredChallenger, setIsRegisteredChallenger] = useState<boolean>(false);
  const [currentChampionId, setCurrentChampionId] = useState<string | null>(null);
  const [selectedChampionId, setSelectedChampionId] = useState<string>('');
  const [fightRecords, setFightRecords] = useState<{ challenger: string; champion: string; result: string; date: string; }[]>([]);
  const [championMap, setChampionMap] = useState<{ [key: string]: Champion }>({});

  useEffect(() => {
    const initialize = async () => {
      const fetchChallengerDetails = async (address: string) => {
        try {
        const contract = await getContract();
        const challengerData = await contract.getChallenger(address);
        const currentChampionId = challengerData[0];
        setCurrentChampionId(currentChampionId)
        setIsRegisteredChallenger(currentChampionId.toLowerCase() === address.toLowerCase())
        setFightRecords(challengerData[1]);
        setLoading(false)
        } catch (error) {
          console.error("Error fetching challenger details for address:", address, error);
        }
      }

        const champions = await fetchChampionMap();
        setChampionMap(champions);

      if (walletConnected) {
        if (!walletAddress) {
          setIsRegisteredChallenger(false);
          return;
        }
        await fetchChallengerDetails(walletAddress)
      }
    };

    initialize();
  }, [walletConnected, walletAddress]);

  useEffect(() => {
    const setupContractListener = async () => {
      const contract = await getContract();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      contract.on('ChallengerRegistered', (challengerAddress, _championId) => {
        if (challengerAddress.toLowerCase() === walletAddress.toLowerCase()) {
          setIsRegisteredChallenger(true);
        }
      });

      return () => {
        contract.off('ChallengerRegistered');
      };
    };

    setupContractListener();
  }, [walletAddress]);


  const handleSelectChampion = (id: string) => {
    setSelectedChampionId(id);
  };

  const becomeChallenger = async () => {
    if (!selectedChampionId) {
      setMessage('Please select a champion first!');
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.registerAsChallenger(selectedChampionId);
      await tx.wait();
      setMessage('Registered as challenger successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error registering as challenger:', error);
      setMessage('Error registering as challenger');
      setLoading(false);
    }
  };

  const challengeBattleMaster = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.challengeBattlemaster();
      await tx.wait();
      setMessage('Challenge sent successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error challenging Battle Master:', error);
      setMessage('Error challenging Battle Master');
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //   <div>
  //   <p>Loading... </p>
  //   {/* <WalletCheck onWalletConnected={handleWalletConnected}/>; */}
  //   </div>
  // )}

  return (
    <div>
      <p>loading? {`${loading}`}</p>
      <p>{walletConnected ? `Wallet is connected: ${walletAddress}` : 'Wallet is not connected'}</p>
      {walletConnected ? (
        <div>
          <p>{isRegisteredChallenger ? `Registered as challenger. Current Champion ID: ${currentChampionId}` : `Not registered as challenger. Current Champion ID: ${currentChampionId}`}</p>
          {!isRegisteredChallenger ? (
            <ChampionSelection
              onSelect={handleSelectChampion}
              onBecomeChallenger={becomeChallenger}
              selectedChampionId={selectedChampionId}
              championMap={championMap}
            />
          ) : (
            <ChallengerDashboard
              onFight={challengeBattleMaster}
              currentChampionId={currentChampionId}
              championMap={championMap}
              fightRecords={fightRecords}
            />
          )}
        </div>
      ) : (
        <WalletCheck onWalletConnected={handleWalletConnected} />
      )}
      {<p>Current champion ID: {currentChampionId || "N/A"}</p>}
    </div>
  );
};

export default App;
