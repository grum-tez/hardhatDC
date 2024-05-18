const { ethers } = require("hardhat");
const { expect } = require("chai");
const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const [owner] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6])
    expect(await battleContract.battle_master_champion_id()).to.equal(6);
  });
  it("Champion map should have correct values for IDs 1, 6, and 7", async function () {
    const [owner] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    const champion1 = await battleContract.championMap(1);
    expect(champion1.name).to.equal("gnat");
    expect(champion1.strength).to.equal(1);
    expect(champion1.hidden).to.equal(false);

    const champion6 = await battleContract.championMap(6);
    expect(champion6.name).to.equal("dragon");
    expect(champion6.strength).to.equal(1000);
    expect(champion6.hidden).to.equal(true);

    const champion7 = await battleContract.championMap(7);
    expect(champion7.name).to.equal("nano-bots");
    expect(champion7.strength).to.equal(100000);
    expect(champion7.hidden).to.equal(true);
  });
});

//TODO check that that the values of 1, 6 and 7 in the champion map are as expected
