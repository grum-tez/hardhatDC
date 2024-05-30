import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.METAMASK_DEV_SEED_PHRASE || "test test test test test test test test test test test junk",
      },
      chainId: 31337,
    },
    // etherlinkTestnet: {
    //   url: "https://node.ghostnet.etherlink.com",
    //   accounts: [process.env.ETHERLINK_TESTNET_KEY],
    // }
  },
  // etherscan: {
  //   apiKey: {
  //     etherlinkTestnet: process.env.ETHERSCAN_API_KEY,
  //   },
  //   customChains: [
  //     {
  //       network: "etherlinkTestnet",
  //       chainId: 128123,
  //       urls: {
  //         apiURL: "https://testnet-explorer.etherlink.com/api",
  //         browserURL: "https://testnet-explorer.etherlink.com"
  //       }
  //     },
  //   ]
  // },
};

export default config;

