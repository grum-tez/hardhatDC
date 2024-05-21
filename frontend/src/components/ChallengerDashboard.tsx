// src/components/ChallengerDashboard.tsx
import React from 'react';
import FightComponent from './FightComponent';
import './ChallengerDashboard.css';

import { Champion } from '../fetchChampionMap';

type ChallengerDashboardProps = {
  challengerAddress: string;
  onFight: () => void;
  currentChampionId: string | null;
  championMap: { [key: string]: Champion };
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerAddress, onFight, currentChampionId, championMap }) => {
  return (
    <div>
      <FightComponent onFight={onFight} currentChampionId={currentChampionId} championMap={championMap} />
    </div>
  );
};

export default ChallengerDashboard;
