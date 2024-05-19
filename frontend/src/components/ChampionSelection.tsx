// src/components/ChampionSelection.tsx
import React, { useState } from 'react';
import './ChampionSelection.css';

type ChampionSelectionProps = {
  onSelect: (id: string) => void;
  selectedChampionId: string;
};

const ChampionSelection: React.FC<ChampionSelectionProps> = ({ onSelect, selectedChampionId }) => {
  const champions = [
    { id: '1', name: 'Champion 1', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Champion 2', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Champion 3', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <div className="champion-selection">
      <h1>WELCOME TO MY BATTLE ARENA!!</h1>
      <p>prepare to be crushed</p>
      <p>Select a champion to hurl pointlessly into battle:</p>
      <div className="champions">
        {champions.map((champion) => (
          <div
            key={champion.id}
            className={`champion ${selectedChampionId === champion.id ? 'selected' : ''}`}
            onClick={() => onSelect(champion.id)}
          >
            <img src={champion.image} alt={champion.name} />
            <p>{champion.name}</p>
          </div>
        ))}
      </div>
      <button className="challenger-button" onClick={() => onSelect(selectedChampionId)}>
        Become a challenger
      </button>
    </div>
  );
};

export default ChampionSelection;
