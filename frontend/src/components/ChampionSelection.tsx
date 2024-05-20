// src/components/ChampionSelection.tsx
import React, { useEffect, useState } from 'react';
import './ChampionSelection.css';

type ChampionSelectionProps = {
  onSelect: (id: string) => void;
  onBecomeChallenger: () => void;
  selectedChampionId: string;
  championMap: { [key: string]: { name: string; strength: string; hidden: boolean } };
};

const ChampionSelection: React.FC<ChampionSelectionProps> = ({
  onSelect,
  onBecomeChallenger,
  selectedChampionId,
  championMap
}) => {
  const [displayedChampions, setDisplayedChampions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const availableChampions = Object.entries(championMap)
      .filter(([_, champion]) => !champion.hidden)
      .map(([id, champion]) => ({ id, name: champion.name }));

    const randomChampions = [];
    while (randomChampions.length < 3 && availableChampions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableChampions.length);
      randomChampions.push(availableChampions.splice(randomIndex, 1)[0]);
    }

    setDisplayedChampions(randomChampions);
  }, [championMap]);

  return (
    <div className="champion-selection">
      <h1>WELCOME TO MY BATTLE ARENA!!</h1>
      <p>prepare to be crushed</p>
      <p>Select a champion to hurl pointlessly into battle:</p>
      <div className="champions">
        {displayedChampions.map((champion) => (
          <div
            key={champion.id}
            className={`champion ${selectedChampionId === champion.id ? 'selected' : ''}`}
            onClick={() => onSelect(champion.id)}
          >
            <img src="https://via.placeholder.com/100" alt={champion.name} />
            <p>{champion.name}</p>
          </div>
        ))}
      </div>
      <button className="challenger-button" onClick={onBecomeChallenger}>
        Become a challenger
      </button>
    </div>
  );
};

export default ChampionSelection;
