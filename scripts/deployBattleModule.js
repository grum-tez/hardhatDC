const hre = require("hardhat");
const ethers = hre.ethers;
const battleModule = require("../backend/ignition/modules/BattleModule");

async function main() {
  // Create a new random wallet
  const randomWallet = ethers.Wallet.createRandom();
  console.log(`Deploying from wallet address: ${randomWallet.address}`);

  // Connect the wallet to the provider
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = randomWallet.connect(provider);

  // Deploy the BattleModule using the new wallet
  const { battleContract } = await hre.ignition.deploy(battleModule, {
    signer: wallet,
  });

  console.log(`BattleContract deployed to: ${await battleContract.getAddress()}`);
}

main().catch(console.error);
