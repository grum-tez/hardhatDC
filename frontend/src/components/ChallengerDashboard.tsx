// src/components/ChallengerDashboard.tsx
import React from 'react';
import FightComponent from './FightComponent';
import './ChallengerDashboard.css';

type ChallengerDashboardProps = {
  challengerId: string;
  onFight: () => void;
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerId, onFight }) => {
  return (
    <div>
      <FightComponent challengerId={challengerId} onFight={onFight} />
    </div>
  );
};

export default ChallengerDashboard;
