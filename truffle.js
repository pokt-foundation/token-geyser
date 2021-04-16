const HDWalletProvider = require('truffle-hdwallet-provider');
const connectionConfig = require('frg-ethereum-runners/config/network_config.json');
require('dotenv').config();

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
          'https://eth-mainnet.gateway.pokt.network/v1/<APP_ID>');
      },
      gasPrice: 35000000000
    },
    rinkeby: {
      ref: 'rinkeby-test',
      network_id: 4,
      provider: () => {
        return new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          'https://eth-rinkeby.gateway.pokt.network/v1/605bbf05e1261e00308bfb23');
      },
      gasPrice: 2000000000
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
