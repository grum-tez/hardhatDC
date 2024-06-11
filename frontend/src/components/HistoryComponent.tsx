import React from 'react';

type HistoryComponentProps = {
  fightRecords: { challenger: string; champion: string; result: string; date: string; }[];
};

const HistoryComponent: React.FC<HistoryComponentProps> = ({ fightRecords }) => {
  console.log(fightRecords)
  return (
    <div>
      <h2>Fight History</h2>
      {fightRecords.length > 0 ? (
        <ul>
          {fightRecords.map((record, index) => {
            const serializedRecord = JSON.stringify(record, (_, value) =>
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
