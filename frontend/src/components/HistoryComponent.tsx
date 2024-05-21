import React from 'react';

type HistoryComponentProps = {
  fightRecords: any[];
};

const HistoryComponent: React.FC<HistoryComponentProps> = ({ fightRecords }) => {
  return (
    <div>
      <h2>Fight History</h2>
      {fightRecords.length > 0 ? (
        <ul>
          {fightRecords.map((record, index) => (
            <li key={index}>{JSON.stringify(record)}</li>
          ))}
        </ul>
      ) : (
        <p>No fight records available.</p>
      )}
    </div>
  );
};

export default HistoryComponent;
