import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BattleModule", (m) => {
  const battleContract = m.contract("BattleContract1", [6]);
  
  return { battleContract };
});
