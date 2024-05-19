// src/components/ChampionMap.tsx
import React, { useEffect, useState } from 'react';
import { getContract } from '../contractService';

interface Champion {
  name: string;
  strength: string; // Store strength as a string for display
  hidden: boolean;
}

const ChampionMap: React.FC = () => {
  const [championMap, setChampionMap] = useState<{ [key: string]: Champion }>({});

  useEffect(() => {
    const fetchChampionMap = async () => {
      try {
        const contract = await getContract();
        const champions: { [key: string]: Champion } = {};

        // Hard code the range of champion IDs from 1 to 7
        for (let i = 1; i <= 7; i++) {
          const id = i.toString();
          const champion = await contract.championMap(i);
          champions[id] = {
            name: champion.name,
            strength: champion.strength.toString(),
            hidden: champion.hidden,
          };
        }

        setChampionMap(champions);
      } catch (error) {
        console.error('Error fetching champion map:', error);
      }
    };

    fetchChampionMap();
  }, []);

  return (
    <div>
      <h2>Champion Map</h2>
      <ul>
        {Object.entries(championMap).map(([id, champion]) => (
          <li key={id}>
            <strong>ID:</strong> {id} <br />
            <strong>Name:</strong> {champion.name} <br />
            <strong>Strength:</strong> {champion.strength} <br />
            <strong>Hidden:</strong> {champion.hidden.toString()} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChampionMap;
