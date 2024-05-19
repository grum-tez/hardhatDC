// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getContract } from './contractService';

const App: React.FC = () => {
  const [battleMasterChampionId, setBattleMasterChampionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [challengerId, setChallengerId] = useState<string>('');

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

    fetchBattleMasterChampionId();
  }, []);

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

  const registerAsChallenger = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.registerAsChallenger(challengerId);
      await tx.wait();
      setMessage('Registered as challenger successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error registering as challenger:', error);
      setMessage('Error registering as challenger');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Battle DApp</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Battle Master Champion ID: {battleMasterChampionId}</p>
          <button onClick={challengeBattleMaster}>Challenge Battle Master</button>
          <div>
            <input
              type="text"
              value={challengerId}
              onChange={(e) => setChallengerId(e.target.value)}
              placeholder="Enter your champion ID"
            />
            <button onClick={registerAsChallenger}>Register as Challenger</button>
          </div>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default App;
