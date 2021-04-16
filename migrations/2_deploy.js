const TokenGeyser = artifacts.require('TokenGeyser');

const STAKING_TOKEN = '0x362067F3833a232786354e1366b0d3797583C7E1'; // wPOKT
const DISTRIBUTION_TOKEN = '0x362067F3833a232786354e1366b0d3797583C7E1'; // wPOKT
const MAX_UNLOCK_SCHEDULES = 1;
const START_BONUS = 1;
const BONUS_PERIOD_SEC = 2592000;
const INITIAL_SHARES_PER_TOKEN = 1;

module.exports = deployer => {
  deployer.deploy(
    TokenGeyser,
    STAKING_TOKEN,
    DISTRIBUTION_TOKEN,
    MAX_UNLOCK_SCHEDULES,
    START_BONUS,
    BONUS_PERIOD_SEC,
    INITIAL_SHARES_PER_TOKEN
  );
};