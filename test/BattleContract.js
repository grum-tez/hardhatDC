const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const BattleContract = await ethers.getContractFactory("BattleContract");
    const battleContract = await BattleContract.deploy();
    await battleContract.deployed();

    expect(battleContract.address).to.properAddress;
  });
});
