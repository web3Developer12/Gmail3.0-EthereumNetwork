require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths:{
    artifacts:"./src/artifacts"
  },
  networks:{
    goerli:{
      url:process.env.URL,
      accounts:[process.env.SECRET_KEY],
    },
    fuji: {
       url: process.env.QUICKNODE_URL,
       accounts: [`0x` + process.env.PRIVATE_KEY],
       chainId: 43113,
    },
  }

};
