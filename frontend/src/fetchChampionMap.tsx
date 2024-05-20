import { getContract } from './contractService';

interface Champion {
  name: string;
  strength: string;
  hidden: boolean;
}

export const fetchChampionMap = async (): Promise<{ [key: string]: Champion }> => {
  const champions: { [key: string]: Champion } = {};

  try {
    const contract = await getContract();

    // Hard code the range of champion IDs from 1 to 7
    for (let i = 1; i <= 7; i++) {
      const id = i.toString();
      const champion = await contract.championMap(i);
      champions[id] = {
        name: champion.name,
        strength: champion.strength.toString(),
        hidden: champion.hidden,
      };
    }
  } catch (error) {
    console.error('Error fetching champion map:', error);
  }

  return champions;
};
