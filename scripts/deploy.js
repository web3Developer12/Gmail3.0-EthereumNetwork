// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [owner, randomPerson] = await hre.ethers.getSigners();
  const factory  = await hre.ethers.getContractFactory("MailSystem");
  const contract = await factory.deploy();
  await contract.deployed();

  await contract.compose(owner.address,"Hello Diana !!","About your deal I declined");
  await contract.compose(owner.address,"QuickNode Team","Feel free to subscribe !");
  await contract.compose(owner.address,"Alchemy University","Your certification is ready !");
  //await contract.move("INBOX","STAR",[0]);
  //const c = await contract.chain()
  //console.log(c)
  
  console.log(
    `Deployed to ${contract.address}`
  );
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
