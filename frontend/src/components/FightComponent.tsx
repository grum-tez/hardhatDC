import React from 'react';
import './ChallengerDashboard.css';

type FightComponentProps = {
  challengerId: string;
  onFight: () => void;
};

const FightComponent: React.FC<FightComponentProps> = ({ challengerId, onFight }) => {
  const battleMasterImage = 'https://via.placeholder.com/100';
  const challengerImage = 'https://via.placeholder.com/100';

  return (
    <div className="challenger-dashboard">
      <h2>Dashboard for challenger {challengerId}</h2>
      <div className="battle-arena">
        <div className="champion">
          <h3>Your champion</h3>
          <img src={challengerImage} alt="Your champion" />
        </div>
        <div className="vs">
          <h3>VS</h3>
        </div>
        <div className="battle-master">
          <h3>THE BATTLEMASTER</h3>
          <img src={battleMasterImage} alt="The Battlemaster" />
        </div>
      </div>
      <button className="fight-button" onClick={onFight}>
        Fight
      </button>
    </div>
  );
};

export default FightComponent;
