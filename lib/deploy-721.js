async function main() {
	// Grab the contract factory 
	const WhaleNFT = await ethers.getContractFactory("WhaleNFT");

	// Start deployment, returning a promise that resolves to a contract object
	const whaleNFT = await WhaleNFT.deploy(); // Instance of the contract 
	console.log("Contract deployed to address:", whaleNFT.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
	 console.error(error);
	 process.exit(1);
 });