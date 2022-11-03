// import {web3} from 'lib/dev-alchemy'
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// const web3 = createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/ZY5SZC4uKH26-fo034Dtl7HprVY7vy_4");
import { Network, Alchemy } from "alchemy-sdk";
const env = require('../../env.json')

const settings = {
  apiKey: env.ALCHEMY_POLYGON_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.

};
const alchemy = new Alchemy(settings);



export default async function handler(req, res) {
	const { address, contractAddr } = JSON.parse(req.body)

	const nfts = await alchemy.nft.getNftsForOwner(address, { contractAddresses:[contractAddr] })
	//console.log ("alchemy returned " + JSON.stringify(nfts))
	res.status(200).json(nfts);
}