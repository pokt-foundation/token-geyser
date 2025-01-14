module.exports = {
    "extends": ["google", "standard", "plugin:prettier/recommended", "mocha"],
    "env": {
        "mocha": true,
        "node": true,
        "es6": true,
    },
    "parserOptions": {
      "ecmaVersion": 8,
    },
    "globals": {
      "artifacts": true,
      "assert": true,
      "contract": true,
      "expect": true,
      "Promise": true,
      "web3": true,
    },
    "plugins": ["prettier", "spellcheck", "chai-friendly"],
    "rules": {
      "prettier/prettier": 0,
      "require-jsdoc": 0,
      "semi": [2, "always"],
      "prefer-const": 2,
      "no-unused-expressions": 0,
      "chai-friendly/no-unused-expressions": 2,
      "spellcheck/spell-checker": [
          2,
          {
            "comments": true,
            "strings": true,
            "identifiers": true,
            "lang": "en_US",
            "skipWords": [
              // misc
              "deployer", "http", "https", "github", "chai", "argv", "evm",
              "jsonrpc", "timestamp", "uint256", "erc20", "bignumber", "lodash",
              "arg", "npm", "seedrandom", "eql", "sinon", "yaml", "posix", "promisify",
              "passcode", "geth", "rpc", "rpcmsg","stdev",  "stochasm", "aggregator",
              "whitelist", "ethereum", "npx", "testrpc", "solc", "whitelisted",
              "unlockable", "openzeppelin", "checksum", "unstakes", "txfee",
              "relayer", "gsn", 'struct', "mainnet", "keystore", "Ethereumjs",
              "ethereumjs", "hdwallet", "keyfile", "priv", "dotenv", "rinkeby", 

              // shorthand
              "eth", "args", "util", "utils", "msg", "prev", "bal",
              "init", "params", "mul", "async", "vals", "fns", "addrs",
              "fns", "num", "dev", "pre","abi", "gte","rnd", "chk", "bals", "lte",
              "addr", "perc", "opcode", "aprox", "str",

              // project-specific
              "rebase", "gons", "frg", "rng", "blockchain", "minlot",
              "redemptions", "rebased", "ganache", "ethclient",
              "bytecode", "Binance", "ampl", "unstake", "unstaked", "unstaking",
              "ampls", "staker", "ownable",

              // names
              "nithin", "naguib"
            ],
            "skipIfMatch": [
              "http(s)?://[^s]*",
              "Sha3",
              "0x*",
            ],
            "minLength": 3
          }
      ],
    },
};
