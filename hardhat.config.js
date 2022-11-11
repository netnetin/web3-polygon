/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config({path:__dirname+'/.env.local'});
require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.8.4",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: process.env.ALCHEMY_ETH_GOERLI_URL+process.env.ALCHEMY_ETH_KEY,
         accounts: [`0x${process.env.PRIVATE_KEY}`]
      },
      mumbai: {
        url: process.env.ALCHEMY_POLYGON_MUMBAI_URL+process.env.ALCHEMY_POLYGON_KEY,
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
   },
   paths: {
      sources: "./api/contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
   }
}