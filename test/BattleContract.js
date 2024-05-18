const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");
    console.log(await hardhatToken.getAddress())
    expect(await hardhatToken.battle_master_champion_id()).to.equal(6);
  });

  it("Should return the correct battle master champion ID", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");
    const battleMasterChampionId = await hardhatToken.battle_master_champion_id();
    expect(battleMasterChampionId).to.equal(6);
  });
});
