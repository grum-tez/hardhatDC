const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const fs = require('fs');
const path = require('path');

module.exports = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Deploy the BattleContract with the specified battle master champion ID
  const battleContract = m.contract("BattleContract", [battleMasterChampionId]);

  // Return the contract as a part of the module
  return { battleContract };
});

// Define a post-deployment hook to save the ABI and address
async function saveContractDetails(contract) {
  const contractAddress = contract.address;
  const contractABI = JSON.parse(contract.interface.format('json'));

  const data = {
    address: contractAddress,
    abi: contractABI
  };

  // Define the path where the ABI and address will be saved
  const filePath = path.join(__dirname, '../../frontend/src/contracts/BattleContract.json');

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the ABI and address to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Export a function to be called after the deployment
module.exports.postDeploy = async function ({ deployments }) {
  const battleContract = deployments.BattleContract;

  if (battleContract) {
    await saveContractDetails(battleContract);
  } else {
    console.error('Deployment of BattleContract failed.');
  }
};