async function main() {
	// Grab the contract factory 
	const MyNFT721 = await ethers.getContractFactory("MyNFT721");

	// Start deployment, returning a promise that resolves to a contract object
	const myNFT721 = await MyNFT721.deploy(); // Instance of the contract 
	console.log("Contract deployed to address:", myNFT721.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
	 console.error(error);
	 process.exit(1);
 });