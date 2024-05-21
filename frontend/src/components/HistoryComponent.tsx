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
          {fightRecords.map((record, index) => {
            const serializedRecord = JSON.stringify(record, (key, value) =>
              typeof value === 'bigint' ? value.toString() : value
            );
            return <li key={index}>{serializedRecord}</li>;
          })}
        </ul>
      ) : (
        <p>No fight records available.</p>
      )}
    </div>
  );
};

export default HistoryComponent;
