const hre = require("hardhat");
const battleModule = require("../ignition/modules/BattleModule");

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

  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(__dirname, '../../frontend/src/contracts/BattleContract.json');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`Contract details saved to ${filePath}`);
}

async function main() {
  const { battleContract } = await hre.ignition.deploy(battleModule);

  if (battleContract) {
    console.log('Calling saveContractDetails function.');
    await saveContractDetails(battleContract);
    console.log('saveContractDetails function executed.');
    console.log('Deployment of BattleContract successful.');
  } else {
    console.error('Deployment of BattleContract failed.');
  }
}

main().catch(console.error);
