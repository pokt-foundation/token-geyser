const HDWalletProvider = require('truffle-hdwallet-provider');
const connectionConfig = require('frg-ethereum-runners/config/network_config.json');
require('dotenv').config();

const MAINNET_GAS_PRICE = 35000000000;
const MAINNET_RPC_URL = 'https://eth-mainnet.gateway.pokt.network/v1/<APP_ID>';

const RINKEBY_GAS_PRICE = 2000000000;
const RINKEBY_RPC_URL = 'https://eth-rinkeby.gateway.pokt.network/v1/<APP_ID>';

module.exports = {
  networks: {
    ganacheUnitTest: connectionConfig.ganacheUnitTest,
    gethUnitTest: connectionConfig.gethUnitTest,
    testrpcCoverage: connectionConfig.testrpcCoverage,
    mainnet: {
      ref: 'mainnet-prod',
      network_id: 1,
      provider: () => {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          MAINNET_RPC_URL);
      },
      gasPrice: MAINNET_GAS_PRICE
    },
    rinkeby: {
      ref: 'rinkeby-test',
      network_id: 4,
      provider: () => {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          RINKEBY_RPC_URL);
      },
      gasPrice: RINKEBY_GAS_PRICE
    }
  },
  mocha: {
    enableTimeouts: false,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD'
    }
  },
  compilers: {
    solc: {
      version: '0.5.0'
    }
  }
};
