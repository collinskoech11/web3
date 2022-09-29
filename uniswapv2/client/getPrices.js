const ethers = require("ethers");
require("dotenv").config()
const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiList");

//standard Provider
const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL
);

// connect to factory
const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);
// connect to router => to call functions
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

// Call the Blockchain

const getPrices = async (mountInHuman) => {
  //convert amoutn in
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString(); // => to blockchain units

  // gRet Amounts Out
  const amountsOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  // convert amountOut to decimals
  const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
  const decimals2 = await contractToken2.decimals();

  //Convert amount out  - human readable
  const amountOutHuman = ethers.utils.formatUnits(
    amountsOut[1].toString(),
    decimals2
  ); // => to human units
  console.log(amountOutHuman)
};
const amountInHuman = "1";
getPrices(amountInHuman);
