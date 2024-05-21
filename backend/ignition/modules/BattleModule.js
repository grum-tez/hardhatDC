const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

console.log('BattleModule is being executed.');
const fs = require('fs');
const path = require('path');

module.exports = buildModule("BattleModule", (m) => {
  const DEFAULT_BATTLE_MASTER_CHAMPION_ID = 6;

  // Define the parameter for the battle master champion ID with a default value
  const battleMasterChampionId = m.getParameter("battleMasterChampionId", DEFAULT_BATTLE_MASTER_CHAMPION_ID);

  // Deploy the BattleContract with the specified battle master champion ID
  const battleContract = m.contract("BattleContract1", [battleMasterChampionId]);

  // Return the contract as a part of the module
  return { battleContract };
});

// Define a post-deployment hook to save the ABI and address
async function saveContractDetails(contract) {
  console.log('saveContractDetails function called.');
  console.log('Contract address:', contract.address);
  console.log('Contract interface:', contract.interface);
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

  // Log the successful save
  console.log(`Contract details saved to ${filePath}`);
}

// Export a function to be called after the deployment
module.exports.postDeploy = async function ({ deployments }) {
  console.log('postDeploy function called.');
  console.log('Deployments object:', deployments);

  const battleContract = deployments.BattleContract1;
  console.log('BattleContract1 deployment details:', battleContract);
  console.log('BattleContract deployment details:', battleContract);

  if (battleContract) {
    console.log('Calling saveContractDetails function.');
    await saveContractDetails(battleContract);
    console.log('saveContractDetails function executed.');
    console.log('Deployment of BattleContract successful.');
  } else {
    console.error('Deployment of BattleContract failed.');
    console.log('Deployment of BattleContract failed.');
  }
};
