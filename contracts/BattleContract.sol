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
}
    
