const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");
    console.log(await hardhatToken.getAddress())
    expect(await hardhatToken.battleMasterChampionId()).to.equal(6);
  });

  it("Should return the correct battle master champion ID", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");
    const battleMasterChampionId = await hardhatToken.battleMasterChampionId();
    expect(battleMasterChampionId).to.equal(6);
  });
  });

  it("Should return the correct champion data from the map", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");

    let champion = await hardhatToken.getChampion(1);
    expect(champion[0]).to.equal("gnat");
    expect(champion[1]).to.equal(1);
    expect(champion[2]).to.equal(false);

    champion = await hardhatToken.getChampion(2);
    expect(champion[0]).to.equal("mouse");
    expect(champion[1]).to.equal(4);
    expect(champion[2]).to.equal(false);

    champion = await hardhatToken.getChampion(3);
    expect(champion[0]).to.equal("termite");
    expect(champion[1]).to.equal(2);
    expect(champion[2]).to.equal(false);

    champion = await hardhatToken.getChampion(4);
    expect(champion[0]).to.equal("skunk");
    expect(champion[1]).to.equal(3);
    expect(champion[2]).to.equal(false);

    champion = await hardhatToken.getChampion(5);
    expect(champion[0]).to.equal("sloth");
    expect(champion[1]).to.equal(10);
    expect(champion[2]).to.equal(false);

    champion = await hardhatToken.getChampion(6);
    expect(champion[0]).to.equal("dragon");
    expect(champion[1]).to.equal(1000);
    expect(champion[2]).to.equal(true);

    champion = await hardhatToken.getChampion(7);
    expect(champion[0]).to.equal("nano-bots");
    expect(champion[1]).to.equal(100000);
    expect(champion[2]).to.equal(true);
  });

  it("Should set and get the correct champion data in the map", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");

    await hardhatToken.setChampion(8, "phoenix", 5000, true);
    const champion = await hardhatToken.getChampion(8);
    expect(champion[0]).to.equal("phoenix");
    expect(champion[1]).to.equal(5000);
    expect(champion[2]).to.equal(true);
  })
