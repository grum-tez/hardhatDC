const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");
const { network } = require("hardhat");

console.log('BattleModule is being executed.');

const battleModule = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Use the first account provided by the local Hardhat node
  const [deployer] = await network.provider.send("eth_accounts");

  // Deploy the BattleContract with the specified battle master champion ID from the deployer's address
  const battleContract = m.contract("BattleContract1", [battleMasterChampionId], { from: deployer });

  // Return the contract as a part of the module
  return { battleContract };
});

module.exports = battleModule;
