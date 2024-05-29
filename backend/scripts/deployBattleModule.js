import hre from "hardhat";
import BattleModule from "../ignition/modules/BattleModule";

async function main() {
  const { battleContract } = await hre.ignition.deploy(BattleModule);

  console.log(`BattleContract deployed to: ${await battleContract.getAddress()}`);
}

main().catch(console.error);
