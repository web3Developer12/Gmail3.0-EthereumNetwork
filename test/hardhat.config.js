require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths:{
    artifacts:"./src/artifacts"
  },
  networks:{
    goerli:{
      url:process.env.URL,
      accounts:[process.env.SECRET_KEY],
    }
  }

};
