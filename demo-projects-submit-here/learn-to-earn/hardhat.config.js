require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24", // 支持 CAIP2.sol 等 0.8.24 合约
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.22", // 支持 ERC1967Utils.sol 等 0.8.22 合约
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20", // 支持主要合约
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
    overrides: {
      "contracts/openzeppelin/contracts/utils/CAIP2.sol": {
        version: "0.8.24",
        settings: {}
      },
      "contracts/openzeppelin/contracts/utils/Bytes.sol": {
        version: "0.8.24",
        settings: {}
      },
      // 为每个需要特定版本的文件添加覆盖
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      gasPrice: "auto",
      gas: "auto",
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "./frontend/src/contracts",
  },
  mocha: {
    timeout: 40000
  }
};