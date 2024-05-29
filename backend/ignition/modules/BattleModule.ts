import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BattleModule", (m) => {
  const battleContract = m.contract("BattleContract1", [1]); // Assuming 1 is the initial battleMasterChampionId

  return { battleContract };
});
