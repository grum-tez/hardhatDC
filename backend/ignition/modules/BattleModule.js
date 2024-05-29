const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

console.log('BattleModule is being executed.');

const battleModule = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Deploy the BattleContract with the specified battle master champion ID
  const battleContract = m.contract("BattleContract1", [battleMasterChampionId]);

  // Return the contract as a part of the module
  return { battleContract };
});

module.exports = battleModule;
