const { ethers } = require("ethers");
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.PROXY_v1;


// import the ABI of contractV1
const { abi} = require("./artifacts/contracts/NFTMedicalV2.sol/NFTMedicalV2.json");

// create a provider and signer to connect to the network
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai');
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// create an instance of the upgradeable contract
const contractV1Instance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const main = async () => {
    let b = await contractV1Instance.owner();
    console.log(b);
    // const tx = await contractV1Instance.mint(["cxcs"],["www.pinata.com"],["sasasas"],[21212212],"Medication","1ab")
    // await tx.wait();
    let c = await contractV1Instance.getTokenIdList("1ab");
    console.log(c);
    // let a = await contractV1Instance.getValue();
    // console.log(parseInt(a));
}
main()