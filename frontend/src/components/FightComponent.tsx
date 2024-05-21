import React from 'react';
import './ChallengerDashboard.css';
import { Champion } from '../fetchChampionMap';

type FightComponentProps = {
  onFight: () => void;
  challengerAddress: string;
  championMap: { [key: string]: Champion };
  currentChampionId: string | null;
};

const FightComponent: React.FC<FightComponentProps> = ({ onFight, challengerAddress, championMap, currentChampionId }) => {
  const battleMasterImage = championMap['6']?.ipfsHash
    ? `https://ipfs.io/ipfs/${championMap['6'].ipfsHash}`
    : 'https://via.placeholder.com/100';
  const challengerImage = currentChampionId && championMap[currentChampionId]?.ipfsHash
    ? `https://ipfs.io/ipfs/${championMap[currentChampionId].ipfsHash}`
    : 'https://via.placeholder.com/100';

  return (
    <div className="challenger-dashboard">
      <div className="battle-arena">
        <div className="champion">
          <h3>Your champion</h3>
          <img src={challengerImage} alt="Your champion" style={{ width: '100px', height: '100px' }} />
        </div>
        <div className="vs">
          <h3>VS</h3>
        </div>
        <div className="battle-master">
          <h3>THE BATTLEMASTER</h3>
          <img src={battleMasterImage} alt="The Battlemaster" style={{ width: '2ok00px', height: '200px' }} />
        </div>
      </div>
      <pre>champion map goes here: {JSON.stringify(championMap, null, 2)}</pre>
      <pre>champion map goes here: {JSON.stringify(championMap, null, 2)}</pre>
      <button className="fight-button" onClick={onFight}>
        Fight
      </button>
    </div>
  );
};

export default FightComponent;
