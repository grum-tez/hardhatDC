const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const [owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("BattleContract");
    console.log(await hardhatToken.getAddress())
  });
});
