//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BattleContract {
    // Storage variable to hold the battle master champion ID
    uint256 public battle_master_champion_id;
    
    struct Champion {
        string name;
        uint strength;
        bool hidden;
    }
}

    struct FightRecord {
        uint256 fightTimestamp;
        bool didChallengerWin;
        string battlemasterChampion;
        string challengerChampion;
    }

    struct Challenger {
        uint currentChampionId;
        FightRecord[] fightHistory;
    }

    mapping(uint => Champion) public championMap;
    mapping(address => Challenger) public challengerMap;

    constructor(uint _battleMasterChampionId) {
        battle_master_champion_id = _battleMasterChampionId;
        championMap[1] = Champion("gnat", 1, false);
        championMap[2] = Champion("mouse", 4, false);
        championMap[3] = Champion("termite", 2, false);
        championMap[4] = Champion("skunk", 3, false);
        championMap[5] = Champion("sloth", 10, false);
        championMap[6] = Champion("dragon", 1000, true);
        championMap[7] = Champion("nano-bots", 100000, true);
    }

    function registerAsChallenger(uint _championId) public {
        Challenger storage newChallenger = challengerMap[msg.sender];
        newChallenger.currentChampionId = _championId;
        delete newChallenger.fightHistory; // Ensure the fight history is empty
    }

        // Getter function for the Challenger struct
    function getChallenger(address _challenger) public view returns (uint, FightRecord[] memory) {
        Challenger storage challenger = challengerMap[_challenger];
        return (challenger.currentChampionId, challenger.fightHistory);
    }

    // Setter function for the Challenger struct
    function setChallengerChampionId(address _challenger, uint _championId) public {
        Challenger storage challenger = challengerMap[_challenger];
        challenger.currentChampionId = _championId;
 }   
    function challengeBattlemaster() public {
        require(challengerMap[msg.sender].currentChampionId != 0, "Challenger not registered");

        // Retrieve the challenger's champion and the battlemaster's champion
        Challenger storage challengerRecord = challengerMap[msg.sender];
        uint challengerChampionId = challengerRecord.currentChampionId;
        Champion storage challengerChampionRecord = championMap[challengerChampionId];
        Champion storage battlemasterChampionRecord = championMap[battle_master_champion_id];

        // Compare strengths
        uint challengerStrength = challengerChampionRecord.strength;
        uint battlemasterStrength = battlemasterChampionRecord.strength;
        bool didChallengerWin = challengerStrength > battlemasterStrength;

        // Create a fight record
        FightRecord memory fightRecord = FightRecord({
            fightTimestamp: block.timestamp,
            didChallengerWin: didChallengerWin,
            battlemasterChampion: battlemasterChampionRecord.name,
            challengerChampion: challengerChampionRecord.name
        });

        // Update the fight history
        challengerRecord.fightHistory.push(fightRecord);
    }
