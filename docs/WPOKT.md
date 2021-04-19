# wPOKT Farm (Contracts)

### 1. Deploy the TokenGeyser contract.

Contract code: https://github.com/pokt-foundation/token-geyser

There are a few parameters to take in consideration when deploying.

**a. STAKING_TOKEN:** this is the token used for staking.
**b. DISTRIBUTION_TOKEN:** this is the token used for rewards.
**c. MAX_UNLOCK_SCHEDULES:** this means how many times you can lock tokens in the Geyser. wPOKT program will operate 1 contract per farm, this should be set to 1.
**d. START_BONUS [0-100]:**  this is the bonus percentage at which the farm will start giving rewards. This should be set to 1%, and this will learnly increase to 100 after X amount of seconds stores in `BONUS_PERIOD_SEC`.
**e. BONUS_PERIOD_SEC:** this is the amount of seconds for linearly reaching the max bonus (multiplier, 3x). According to Adam, this is going to be `2592000` for the Genesis Farm.
**f. INITIAL_SHARES_PER_TOKEN:** this is how many shares you get per token staked. Since wPOKT is not a rebasing token, this shold be set to 1.

**Note:** the ownership of the contract is set to the deployer.

**Rinkeby Deployment**
```
wPOKT: 0x362067F3833a232786354e1366b0d3797583C7E1
TokenGeyser: 0xC32eB16f016b193966caC6980F5EB25d498E8DC9
Unlocked wPOKT Pool: 0x39b79EF73F25413BBA2624f818eA924b74B83EBF
Locked wPOKT Pool: 0x5368e433d65E2De1188dC0B9a0B9a74e7DD1AC3A
```

### 2. Understanding the TokenGeyser contract.

After the contract is deployed, it is basically empty. The `owner` of the Geyser is in charge of creating the first (and unique, in the wPOKT case) unlock schedule aka **locking tokens for rewards**.

Why is it called a schedule? Because to lock tokens, you need to pass two parameters.

a. `amount`: The amount of tokens to lock (wPOKT).
b. `durationSec`: time in seconds until all rewards are linearly unlocked (moved from the `Locked Rewards Pool` to the `Unlocked Rewards Pool`). 

For the Genesis Farm, it is supposed to be 50,000 wPOKT (6 decimals) and 180 days. In short, at the end of 180 days the `Locked Pool` will be empty.

Once the `owner` has called `lockTokens(amount, durationSec)`, the farm is oficially up and running.

### 3. User Interactions with TokenGeyser contract.

After initializing (1) and funding (2) the Geyser, people can freely stake and unstake to farm.

Behind the scenes, we are calling `stake(amount)` and `unstake(amount)` methods in the contract.

After each `stake()` call: the amount of tokens in the Unlocked & Locked Pool are updated. [Read more.](https://github.com/ampleforth/token-geyser/blob/master/contracts/TokenGeyser.sol#L173)

Since tokens linearly move from `Locked Pool` to `Unlocked Pool`, the contract does some math to determine how much needs to be moved after each `stake()` and `unstake()`.

The difference is that, after each `unstake()` call: besides updating the pool balances, you get the corresponding rewards depending on how long you've been staking and how much. Each stake has it's own bonus, time staked & weight. All of your stakes sum up to give you a `ownership share` over the **`Unlocked Pool`**.

**Why is emphasis on `Unlocked Pool`?**
Because you need to be aware that rewards are linearly unlocked for 180 days, and staking before that time means that the pool of rewards is SMALLER.

**What is the ownership share?**

**(User_staking_token_time / Global_staking_token_time)**

```
Alice_token_time = 10 tokens * 1 days = 10 
Bob_token_time = 5 tokens * 3 days = 15

Global_staking_token_time = (Alice_token_time) + (Bob_token_time) = 25 token_days

Alice owns (10 / 25) = 40%
Bob owns (15 / 25) = 60%
```

**Now, let's explain with numbers:**

There are 29,000 wPOKT staked since the Geyser was created (3days ago). Today, Enrique wants to stake 10,000 wPOKT. And nope, he's not getting %25 ownership share immediately.

By the way the Geyser is designed, **people that stake for longer are benefited**. Why?

```
Other people (29,000 * 259200 seconds = 7516800000 share seconds) 
vs 
Enrique (10,000 * a few seconds = 20000 share seconds)

20000/7516800000 = 0.00026607066%. 
This means that right after staking, 
Enrique would get 0.00026607066% ownership over the Unlocked Pool.


After three days, the numbers will look like this:
Other people (29,000 * 518400 = 15033600000 share seconds) 
vs 
Enrique (10,000 * 259200 = 2592000000 share seconds)

2592000000/15033600000 = 17.24%
This means that after 3 days, 
Enrique would get 17.24% ownership over the Unlocked Pool.
```
Note: all of this is assuming no one else stakes/unstakes after Enrique staked.






u
