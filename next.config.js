/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ALCHEMY_POLYGON_MUMBAI_URL: process.env.ALCHEMY_POLYGON_MUMBAI_URL,
    ALCHEMY_POLYGON_KEY: process.env.ALCHEMY_POLYGON_KEY,
    POLYGON_TESTNET_CONTRACT_ADDRESS: process.env.POLYGON_TESTNET_CONTRACT_ADDRESS,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NFT_TOKEN_URI: process.env.NFT_TOKEN_URI
  }
}

module.exports = nextConfig
