import hre from "hardhat";
import BattleModule from "../ignition/modules/BattleModule";

async function main() {
  const { battleContract } = await hre.ignition.deploy(BattleModule);

  console.log(`BattleContract1 deployed to: ${await battleContract.getAddress()}`);
}

main().catch((error) => {
  console.error("Deployment failed with error:", error);
  process.exit(1);
});
