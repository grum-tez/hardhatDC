import { ethers } from "hardhat";
import hre from "hardhat";
import BattleModule from "../ignition/modules/BattleModule";

async function generateRandomAddress() {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
}

async function main() {
  const randomAddress = await generateRandomAddress();
  console.log(`Generated random address: ${randomAddress}`);

  // Ensure the Hardhat network is being used
  const network = await hre.network.name;
  console.log(`Using network: ${network}`);

  if (network !== "localhost") {
    console.error("Please run the script with the local Hardhat node.");
    process.exit(1);
  }

  const { battleContract } = await hre.ignition.deploy(BattleModule);

  console.log(`BattleContract1 deployed to: ${await battleContract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
