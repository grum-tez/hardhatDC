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
  fightRecords: any[];
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerAddress, onFight, currentChampionId, championMap, fightRecords }) => {
  return (
    <div>
      <HistoryComponent fightRecords={fightRecords} />
      <FightComponent onFight={onFight} currentChampionId={currentChampionId} championMap={championMap} />
    </div>
  );
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerAddress, onFight, currentChampionId, championMap }) => {
  return (
    <div>
      <HistoryComponent />
      <FightComponent onFight={onFight} currentChampionId={currentChampionId} championMap={championMap} />
    </div>
  );
};

export default ChallengerDashboard;
