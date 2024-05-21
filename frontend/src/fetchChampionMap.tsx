import { getContract } from './contractService';

export interface Champion {
  name: string;
  strength: string;
  hidden: boolean;
  ipfsHash: string;
}

interface Champion {
  name: string;
  strength: string;
  hidden: boolean;
  ipfsHash: string;
}

export const fetchChampionMap = async (): Promise<{ [key: string]: Champion }> => {
  const champions: { [key: string]: Champion } = {};

  try {
    const contract = await getContract();

    for (let i = 1; i <= 7; i++) {
      const id = i.toString();
      const champion = await contract.championMap(i);
      champions[id] = {
        name: champion.name,
        strength: champion.strength.toString(),
        hidden: champion.hidden,
        ipfsHash: champion.ipfsHash,
      };
    }
  } catch (error) {
    console.error('Error fetching champion map:', error);
  }

  return champions;
};
