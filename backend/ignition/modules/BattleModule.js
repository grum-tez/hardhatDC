const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");
const { network } = require("hardhat");

console.log('BattleModule is being executed.');

const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

// Generate a random wallet
const randomWallet = ethers.Wallet.createRandom();

// Add the random wallet to the local Hardhat node
await network.provider.send("hardhat_setBalance", [
  randomWallet.address,
  "0x1000000000000000000", // 1 ETH in hex
]);

const battleModule = buildModule("BattleModule", (m) => {
  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Deploy the BattleContract with the specified battle master champion ID from the random wallet's address
  const battleContract = m.contract("BattleContract1", [battleMasterChampionId], { from: randomWallet.address });

  // Return the contract as a part of the module
  return { battleContract };
});

module.exports = battleModule;
