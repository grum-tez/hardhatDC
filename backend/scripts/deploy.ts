import { ethers } from "hardhat";
import BattleModule from "../ignition/modules/BattleModule";

async function generateRandomAddress() {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
}

async function main() {
  const randomAddress = await generateRandomAddress();
  console.log(`Generated random address: ${randomAddress}`);

  const { battleContract } = await hre.ignition.deploy(BattleModule, {
    parameters: { BattleModule: { from: randomAddress } },
  });

  console.log(`BattleContract1 deployed to: ${await battleContract.getAddress()}`);
}

main().catch(console.error);
