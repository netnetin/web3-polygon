const path = require('path');
// require('dotenv').config({path:path.join(__dirname,'../.env.test')});
const ethers = require('ethers');
const env = require('../env.json')
// Get Alchemy API Key
// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('maticmum', env.ALCHEMY_POLYGON_KEY) // mumbai

// Get contract ABI file
const contract = require("../artifacts/api/contracts/MyNFT721.sol/MyNFT721.json");

// Create a signer
const privateKey = env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi

const contractAddress = env.POLYGON_TESTNET_CONTRACT_ADDRESS // mumbai 721

// Create a contract instance
const myNft721Contract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmT5CR8VXPijPtDRii8k2AhHZaa7Vie6rCB3dvg3rESukP"

// Call mintNFT function
const mintNFT = async () => {
	console.log('MINTING NFT NOW');
	var options = { gasLimit: 200000 };
	let nftTxn = await myNft721Contract.mintNFT(signer.address, tokenUri, options)
	await nftTxn.wait()
	console.log(`NFT Minted! Check it out at: https://mumbai.polygonscan.io/tx/${nftTxn.hash}`)
	return nftTxn
}

// mintNFT()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 			console.error(error);
// 			process.exit(1);
// 	});

export default mintNFT