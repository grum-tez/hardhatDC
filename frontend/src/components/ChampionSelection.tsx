// src/components/ChampionSelection.tsx
import React, { useEffect, useState } from 'react';
import './ChampionSelection.css';

type ChampionSelectionProps = {
  onSelect: (id: string) => void;
  onBecomeChallenger: () => void;
  selectedChampionId: string;
  championMap: { [key: string]: { name: string; strength: string; hidden: boolean } };
};

const ipfsHashes: { [key: string]: string } = {
  "sloth": "QmSXByNYCu3VoF2Q6m9Gy8xugp7Va4XsuUvSMaMSjUD1ou",
  "mouse": "QmbpMjbgsFMaLVmtgJf1AdXRXwppJmuG5NGU44Bp9jqsKd",
  "termite": "QmRdCMxLtUCRNtiwpLsePFZ6QAAiZPtNxDUMUsvZuxoXeC",
  "skunk": "QmNt7Xet8oLebiPeRTZCp4qF3CjhWG4itgpw9ZJmpywGz3",
  "gnat": "QmWAKjX1LUnb3v2jQJ3Zd9Gu32tFAewwtjZuABfczs6Mj2",
  "nanobots": "QmNutTRBNYoqCCmXCD1xkvQqNhY5DZBupcqUJhxSV3uHK1",
  "dragon": "QmPPW2Rg1GYoBbXbMbsh3Mk6m9BagdiVjcRpoLyxDkkFbc"
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
            <img src={`https://ipfs.io/ipfs/${ipfsHashes[champion.name.toLowerCase()]}`} alt={champion.name} />
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
