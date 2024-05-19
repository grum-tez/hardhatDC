const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;
  
  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Deploy the BattleContract with the specified battle master champion ID
  const battleContract = m.contract("BattleContract", [battleMasterChampionId]);

  return { battleContract };
});
