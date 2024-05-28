const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

console.log('BattleModule is being executed.');

const battleModule = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Generate a random wallet
  const randomWallet = ethers.Wallet.createRandom();

  // Deploy the BattleContract with the specified battle master champion ID from the random wallet's address
  const battleContract = m.contract("BattleContract1", [battleMasterChampionId], { from: randomWallet.address });

  // Return the contract as a part of the module
  return { battleContract };
});

module.exports = battleModule;
