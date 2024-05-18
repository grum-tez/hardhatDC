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

  it("Should get the correct challenger details", async function () {
    const [owner, challenger] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    await battleContract.connect(challenger).registerAsChallenger(3);

    const [currentChampionId, fightHistory] = await battleContract.getChallenger(challenger.address);
    expect(currentChampionId).to.equal(3);
    expect(fightHistory.length).to.equal(0);
  });

  it("Should set the correct challenger champion ID", async function () {
    const [owner, challenger] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    await battleContract.connect(challenger).registerAsChallenger(3);
    await battleContract.setChallengerChampionId(challenger.address, 5);

    const [currentChampionId, fightHistory] = await battleContract.getChallenger(challenger.address);
    expect(currentChampionId).to.equal(5);
  });

  it("Should register a new challenger", async function () {
    const [owner, challenger] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    await battleContract.connect(challenger).registerAsChallenger(3);

    const [currentChampionId, fightHistory] = await battleContract.getChallenger(challenger.address);
    expect(currentChampionId).to.equal(3);
    expect(fightHistory.length).to.equal(0);
  });
  it("Should allow a challenger to challenge the battlemaster and update fight history", async function () {
    const [owner, challenger] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    await battleContract.connect(challenger).registerAsChallenger(3);
    await battleContract.connect(challenger).challengeBattlemaster();

    const [currentChampionId, fightHistory] = await battleContract.getChallenger(challenger.address);
    expect(fightHistory.length).to.equal(1);
    expect(fightHistory[0].battlemasterChampion).to.equal("dragon");
    expect(fightHistory[0].challengerChampion).to.equal("termite");
  });
  it("Should confirm that a user who registered as a mouse lost their most recent fight against the battlemaster", async function () {
    const [owner, challenger] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6]);

    await battleContract.connect(challenger).registerAsChallenger(2); // Register as mouse
    await battleContract.connect(challenger).challengeBattlemaster();

    const [currentChampionId, fightHistory] = await battleContract.getChallenger(challenger.address);
    expect(fightHistory.length).to.equal(1);
    expect(fightHistory[0].battlemasterChampion).to.equal("dragon");
    expect(fightHistory[0].challengerChampion).to.equal("mouse");
    expect(fightHistory[0].didChallengerWin).to.equal(false); // Confirm the user lost
  });
});
