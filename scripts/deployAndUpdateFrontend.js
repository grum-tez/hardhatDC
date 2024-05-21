const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, '../backend');
const frontendDir = path.join(__dirname, '../frontend');
const battleContractArtifactPath = path.join(backendDir, 'ignition/deployments/chain-31337/artifacts/BattleModule#BattleContract1.json');
const deployedAddressesPath = path.join(backendDir, 'ignition/deployments/chain-31337/deployed_addresses.json');
const frontendContractPath = path.join(frontendDir, 'src/contracts/BattleContract.json');

function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const process = exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });

    process.stdout.pipe(process.stdout);
    process.stderr.pipe(process.stderr);
  });
}

async function main() {
  try {
    // Step 1: Run Hardhat node
    console.log('Starting Hardhat node...');
    await runCommand('npx hardhat node', { cwd: backendDir });

    // Step 2: Deploy contracts locally
    console.log('Deploying contracts locally...');
    await runCommand('yarn deployLocal', { cwd: backendDir });

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
