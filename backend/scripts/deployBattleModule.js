const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  await hre.run('compile'); // We are compiling the contracts using Hardhat

  // Create a new random wallet
  const randomWallet = ethers.Wallet.createRandom();
  console.log("Generated new random wallet address:", randomWallet.address);

  // Connect the wallet to the provider
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = randomWallet.connect(provider);

  // Deploy the BattleContract using the new wallet address
  const BattleContract = await ethers.getContractFactory("BattleContract1", wallet);
  const battleContract = await BattleContract.deploy();

  console.log("BattleContract deployed to:", battleContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
