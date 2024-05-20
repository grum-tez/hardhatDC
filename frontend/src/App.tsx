import React, { useState, useEffect } from 'react';
import { getContract } from './contractService';
import ChampionSelection from './components/ChampionSelection';
import ChallengerDashboard from './components/ChallengerDashboard';
import { fetchChampionMap } from './fetchChampionMap';
import WalletCheck from './components/WalletCheck';
import './App.css';

interface Champion {
  name: string;
  strength: string;
  hidden: boolean;
}

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [battleMasterChampionId, setBattleMasterChampionId] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string>('');

  const handleWalletConnected = (address: string) => {
    setUserAddress(address);
    setWalletConnected(true);
    checkIfRegisteredChallenger(address);
  };

  const checkIfRegisteredChallenger = async (address: string) => {
    try {
      const contract = await getContract();
      const challenger = await contract.challengerMap(address);
      if (challenger.currentChampionId) {
        setIsRegisteredChallenger(true);
        setChallengerId(challenger.currentChampionId.toString());
      } else {
        setIsRegisteredChallenger(false);
      }
    } catch (error) {
      console.error('Error checking if registered challenger:', error);
      setIsRegisteredChallenger(false);
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [challengerId, setChallengerId] = useState<string>('');
  const [isRegisteredChallenger, setIsRegisteredChallenger] = useState<boolean>(false);
  const [selectedChampionId, setSelectedChampionId] = useState<string>('');
  const [championMap, setChampionMap] = useState<{ [key: string]: Champion }>({});

  useEffect(() => {
    const fetchBattleMasterChampionId = async () => {
      try {
        const contract = await getContract();
        const id = await contract.battle_master_champion_id();
        setBattleMasterChampionId(id.toString());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Battle Master Champion ID:', error);
        setLoading(false);
      }
    };

    const fetchMap = async () => {
      const champions = await fetchChampionMap();
      setChampionMap(champions);
    };

    fetchBattleMasterChampionId();
    fetchMap();
    if (walletConnected) {
      checkIfRegisteredChallenger(userAddress);
    }
  }, [walletConnected, userAddress]);

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
      setChallengerId(selectedChampionId);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{walletConnected ? `Wallet is connected: ${userAddress}` : 'Wallet is not connected'}</p>
      {walletConnected ? (
        <p>{isRegisteredChallenger ? 'Registered as challenger' : 'Not registered as challenger'}</p>
        <>
          {!isRegisteredChallenger ? (
            <>
              <ChampionSelection
                onSelect={handleSelectChampion}
                onBecomeChallenger={becomeChallenger}
                selectedChampionId={selectedChampionId}
                championMap={championMap}
              />
            </>
          ) : (
            <ChallengerDashboard challengerId={challengerId} onFight={challengeBattleMaster} />
          )}
        </>
      ) : (
        <WalletCheck onWalletConnected={handleWalletConnected} />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
