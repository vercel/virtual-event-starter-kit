// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Deploy the NFT contract
  // First we get signers from the blockchain
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  // Secondly we deploy our NFT contract
  const VercelNFTFactory = await hre.ethers.getContractFactory('VercelNFT');
  const VercelNFT = await VercelNFTFactory.deploy(); // deploy the contract
  // Wait the contract deployment
  await VercelNFT.deployed();
  // Log the address
  console.log('VercelNFT deployed to:', VercelNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
