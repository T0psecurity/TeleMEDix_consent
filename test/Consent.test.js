// // Import the Hardhat runtime environment
// const { ethers } = require("hardhat");
// const { expect } = require("chai");

// describe("NFTFactory", function () {
//   let NFTFactory;
//   let nftFactory;
//   let owner;
//   let addr1;
//   let addr2;

//   beforeEach(async function () {
//     // Get the accounts from Hardhat
//     [owner, addr1, addr2] = await ethers.getSigners();

//     // Deploy the NFTFactory contract
//     NFTFactory = await ethers.getContractFactory("NFTFactory");
//     nftFactory = await NFTFactory.deploy(owner.address);
//     await nftFactory.deployed();
//   });

//   it("should create a user contract", async function () {
//     const userId = "user123";
//     const newOwner = addr1.address;

//     // Create a new user contract
//     await nftFactory.createUserContract(userId, owner.address, newOwner);

//     // Check if the user contract was created
//     const userContractAddress = await nftFactory.userContracts(userId);
//     expect(userContractAddress).to.not.equal(ethers.constants.AddressZero);

//     // Verify the emitted event
//     const createEvent = (await nftFactory.getUserContractCreated()).args;
//     expect(createEvent.userAddress).to.equal(owner.address);
//     expect(createEvent.contractAddress).to.equal(userContractAddress);
//   });

//   it("should delete a user contract", async function () {
//     const userId = "user456";
//     const newOwner = addr1.address;

//     // Create a new user contract
//     await nftFactory.createUserContract(userId, owner.address, newOwner);

//     // Delete the user contract
//     await nftFactory.deleteUserContract(userId);

//     // Check if the user contract was deleted
//     const deletedUserContractAddress = await nftFactory.userContracts(userId);
//     expect(deletedUserContractAddress).to.equal(ethers.constants.AddressZero);

//     // Verify the emitted event
//     const deleteEvent = (await nftFactory.getUserContractDeleted()).args;
//     expect(deleteEvent.userAddress).to.equal(userId);
//     expect(deleteEvent.contractAddress).to.not.equal(ethers.constants.AddressZero);
//   });
// });
