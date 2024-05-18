pragma solidity ^0.8.0;

contract BattleContract {
    // Storage variable to hold the battle master champion ID
    uint256 public battle_master_champion_id;

    // Struct to store champion data
    struct Champion {
        string name;
        uint256 strength;
        bool hidden;
        // Initialize some champions in the map
        champion_map[1] = Champion("gnat", 1, false);
        champion_map[2] = Champion("mouse", 4, false);
        champion_map[3] = Champion("termite", 2, false);
        champion_map[4] = Champion("skunk", 3, false);
        champion_map[5] = Champion("sloth", 10, false);
        champion_map[6] = Champion("dragon", 1000, true);
        champion_map[7] = Champion("nano-bots", 100000, true);
    }

    // Function to set a champion in the map
    function setChampion(uint256 id, string memory name, uint256 strength, bool hidden) public {
        champion_map[id] = Champion(name, strength, hidden);
    }

    // Function to get a champion from the map
    function getChampion(uint256 id) public view returns (string memory name, uint256 strength, bool hidden) {
        Champion memory champion = champion_map[id];
        return (champion.name, champion.strength, champion.hidden);

// Mapping to store champion data
    mapping(uint256 => Champion) public champion_map;

    // Constructor to initialize the contract
    constructor() {
        battle_master_champion_id = 6;
    }
}
    
