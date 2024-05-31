const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, '../backend');
const frontendDir = path.join(__dirname, '../frontend');

const chainId = process.argv[2];
if (!chainId) {
  console.error('Please provide a chain ID as a parameter.');
  process.exit(1);
}

const battleContractArtifactPath = path.join(backendDir, `ignition/deployments/chain-${chainId}/artifacts/BattleModule#BattleContract1.json`);
const deployedAddressesPath = path.join(backendDir, `ignition/deployments/chain-${chainId}/deployed_addresses.json`);
const frontendContractPath = path.join(frontendDir, 'src/contracts/BattleContract.json');

async function main() {
  try {
    // Step 3: Update frontend contract file
    console.log('Updating frontend contract file...');
    const battleContractArtifact = JSON.parse(fs.readFileSync(battleContractArtifactPath, 'utf8'));
    const deployedAddresses = JSON.parse(fs.readFileSync(deployedAddressesPath, 'utf8'));

    const frontendContract = {
      address: deployedAddresses['BattleModule#BattleContract1'],
      abi: battleContractArtifact.abi
    };

    fs.writeFileSync(frontendContractPath, JSON.stringify(frontendContract, null, 2));
    console.log('Frontend contract file updated successfully.');
  } catch (error) {
    console.error('Error during deployment and update:', error);
  }
}

main();
