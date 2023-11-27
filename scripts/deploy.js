const {ethers,upgrades} = require("hardhat");
// const { ethers } = require("hardhat");

async function main() {
  // Replace with NFTMedical contract's Ethereum address
  const nftMedicalAddress = '...';

  // Deploy the Consent contract
  const Consent = await ethers.getContractFactory('Consent');
  const upgradeContract = await upgrades.deployProxy(Consent,[],{ initializer: 'initialize' })
  // const upgraded = await upgrades.upgradeProxy(proxy, NFTMedical);
  // const contract = await NFTMedical.deploy(deployerAddress);
  //await contract.deployed();

  await upgradeContract.deployed();

  console.log(`proxy contract deployed to address: ${upgradeContract.address}`);
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
