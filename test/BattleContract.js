const { ethers } = require("hardhat");
const { expect } = require("chai");
const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");

describe("BattleContract", function () {
  it("Deployment should initialize the contract", async function () {
    const [owner] = await ethers.getSigners();
    const battleContract = await ethers.deployContract("BattleContract", [6])
    // TODO: test that battle_master_champion_id equals 6
  });
})
