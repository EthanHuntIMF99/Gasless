require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;


module.exports = {
  solidity: "0.8.20",
  networks:{
    localhost:{
      url: "http://127.0.0.1:8545/"
    },
    sepolia: {
      url: `https://sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, // Use your Alchemy URL
      accounts: [PRIVATE_KEY].filter(Boolean),
    },
  },
  etherscan: {
      apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  }
}

