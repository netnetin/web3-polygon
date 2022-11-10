Polygon Testnet Network

Environment Variables needed -

- ALCHEMY_POLYGON_KEY
- ALCHEMY_POLYGON_MAINNET_URL = 'https://polygon-mainnet.g.alchemy.com/v2/'
- POLYGON_TESTNET_CONTRACT_ADDRESS = '0x6ca02692FD98DB216E9475ECFA2A0b845857a807'
- PRIVATE_KEY = signer's private key


In this project - 
- Connect your wallet with Metamask by clicking on the 'Connect Wallet' button
- Make sure your chain is set to Polygon Mumbai Testnet
Once connected you can see your balance and NFTs in your wallet in the dashbord
- Click on 'Mint an NFT' button to mint a test NFT in your wallet


To change contract -
- To Change contract name, change filename and contract name in file in ./api/contracts/MyNFT721.sol
- Run ```npx hardhat compile```
- Update contract name in deploy script - ./lib/deploy-721.js
- Deploy the new contract by running ```npx hardhat --network mumbai run scripts/deploy.js```
- Update the contract's ABI file import and the contract address in file mint-nft-721-polygon.js
- Update NFT data using [Pinata](https://app.pinata.cloud/)
	- Go to 'Files', click on 'Upload' to upload your image.
	- Update NFT attributes and image url in file ./lib/nft-metadata.json, and upload it to Pinata
- You can also create and sign the transcation - add the signing code block from [here](https://ethereum.org/ca/developers/tutorials/how-to-mint-an-nft/#create-txn)
- Run ```node scripts/mint-nft.js``` to deploy your NFT


Above steps are from this [tutorial](https://ethereum.org/ca/developers/tutorials/how-to-write-and-deploy-an-nft/)
