const path = require('path');
// require('dotenv').config({path:path.join(__dirname,'../.env.test')});
const ethers = require('ethers');
// Get Alchemy API Key
// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_POLYGON_KEY) // mumbai

// Get contract ABI file
const contract = require("../artifacts/api/contracts/WhaleNFT.sol/WhaleNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi

const contractAddress = process.env.POLYGON_TESTNET_CONTRACT_ADDRESS // mumbai 721

// Create a contract instance
const nftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = process.env.NFT_TOKEN_URI

// Call mintNFT function
const mintNFT = async (destinationAddr) => {
	console.log('MINTING NFT NOW');
	var options = { gasLimit: 200000 };
	let nftTxn = await nftContract.mintNFT(destinationAddr, tokenUri, options)
	await nftTxn.wait()
	console.log(`NFT Minted! Check it out at: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`)
	return nftTxn
}

// mintNFT()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 			console.error(error);
// 			process.exit(1);
// 	});

export default mintNFT