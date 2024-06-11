// src/contractService.ts
import { ethers } from 'ethers';
import BattleContract from './contracts/BattleContract.json';

const contractAddress = BattleContract.address;
const contractABI = BattleContract.abi;

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install it.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer)
  console.log(contract.interface)
  return contract ;
};
