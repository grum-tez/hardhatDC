// src/components/ChallengerDashboard.tsx
import React from 'react';
import FightComponent from './FightComponent';
import './ChallengerDashboard.css';

type ChallengerDashboardProps = {
  challengerAddress: string;
  onFight: () => void;
};

const ChallengerDashboard: React.FC<ChallengerDashboardProps> = ({ challengerAddress, onFight }) => {
  return (
    <div>
      <FightComponent onFight={onFight} />
    </div>
  );
};

export default ChallengerDashboard;
