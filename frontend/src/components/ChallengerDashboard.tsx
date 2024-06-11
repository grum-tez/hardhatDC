// src/components/ChallengerDashboard.tsx
import React from 'react';
import FightComponent from './FightComponent';
import './ChallengerDashboard.css';
import HistoryComponent from './HistoryComponent';

import { Champion } from '../fetchChampionMap';

type ChallengerDashboardProps = {
  challengerAddress: string;
  onFight: () => void;
  currentChampionId: string | null;
  championMap: { [key: string]: Champion };
  fightRecords: { challenger: string; champion: string; result: string; date: string }[];
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerAddress, onFight, currentChampionId, championMap, fightRecords }) => {
  return (
    <div>
      <HistoryComponent fightRecords={fightRecords} />
      <FightComponent onFight={onFight} currentChampionId={currentChampionId} championMap={championMap} />
    </div>
  );
};


export default ChallengerDashboard;
