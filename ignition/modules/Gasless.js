
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const initialOwner = "0x344b05a42BB36DAA3534565Ec49fD9b87706183F"; // Example address

module.exports = buildModule("GaslessModule", (m) => {

  const gasless = m.contract("GaslessNFT", [initialOwner]);

  return { gasless };
})

// contract address: 0xFDA1A112dDEd44136Ff07077faF5ce9FcCc0B729

