import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Head from 'next/head'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DisplayNfts from './DisplayNfts'
import mintNFT from "../lib/mint-nft-721-polygon";
import env from "../env.json";

export default function WalletCard() {
	
  const [ address, setAddress ] = useState('');
  const [ balance, setBalance ] = useState('');
  const [ err, setErr ] = useState(false);
  const [ msg, setMsg ] = useState('');
  const [ contractAddr, setContractAddr ] = useState(env.POLYGON_TESTNET_CONTRACT_ADDRESS);
  const [ load, setLoad ] = useState(false);
  const [ mintedNFTHash, setMintedNFTHash ] = useState(null)

  useEffect(() => {
    if (window.ethereum) {
      console.log("get wallet info...");
      loadWalletInfo();
    }else(
      console.log("no wallet...")
    )

    window.ethereum.on("accountsChanged", chainChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  });

  const loadWalletInfo = async () => {
    await window.ethereum.request({ method: 'eth_accounts' })
    .then((accounts) => {
			if(accounts[0]){
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        const Account = provider.getSigner();
        let version = window.ethereum.networkVersion;
        if(version === "80001"){
          getAddress(Account);
          getBalance(Account);
          setErr(false);
          setMsg("");
        }else{
          setErr(true);
          setMsg("Please switch your network to mumbai polygon!");
        }
      }
		});
  }

  const connectWallet = async () => {
    let version = await window.ethereum.networkVersion;
    if(version === "80001"){
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Account = provider.getSigner();
      getAddress(Account);
      getBalance(Account);
      setErr(false);
      setMsg("");
    }else{
      setErr(true);
      setMsg("Please switch your network to mumbai polygon!");
    }
  }

  const getAddress = async (Account) => {
    const Address = await Account.getAddress();
    if(Address){
      setAddress(Address);
    }else{
      setAddress('');
    }  
  }

  const getBalance = async (Account) => {
    const Balance = await Account.getBalance();
    if(Balance){
      let bal = ethers.utils.formatEther(Balance);
      setBalance(bal);
    }else{
      setBalance('');
    } 
  }

  const chainChangedHandler = async () => {
    setAddress('');
    setBalance('');
    setErr(false);
    setMsg("");
  }
  const mintThisNFT = async (destinationAddr) => {
    setLoad(true)
    console.log("mingint and air-dropping to", destinationAddr);
    let mintedNFT = await mintNFT(destinationAddr)
    console.log('Minted = ', mintedNFT);
    setMintedNFTHash(mintedNFT.hash)
    setLoad(false)
  }

  return (
		<div>
      <Head>
        <title>WEB3 APP | Polygon</title>
      </Head>
      <Container className='customContainer'>
        { !err ?
          <div>
            { !address || !balance ? 
              <div className='text-center'>
                <Button 
                  onClick={ ()=>connectWallet() }
                  className="btn-block customPrimaryBtn"
                >
                  Connect Wallet
                </Button>
              </div>
            :
              <div>
                <Row className='text-center'>
                  <Col>
                    <p className='py-1 text-success'>Status: connected</p>
                  </Col>
                </Row>
                <div className='text-left'>
                  <p>Address: <span className='text-primary'>{ address }</span></p>
                  <p>Balance: <span className='text-primary'>{ balance } MATIC</span></p>
                  <br/>
                  <Row className='my-3 align-items-center justify-content-center'>
                    <Col ><p className='my-0'>Looking for NFTs with contract address: <span className='text-primary'>{contractAddr}</span></p></Col>
                    <Col md="auto">
                      <Button
                        disabled={load}
                        onClick={ ()=>mintThisNFT(address) }
                        className="btn-block customPrimaryBtn my-2"
                      >
                        Mint an NFT
                      </Button>
                    </Col>
                  </Row>
                  {mintedNFTHash && <p>NFT Minted! Check it out at: <a href={`https://mumbai.polygonscan.com/tx/${mintedNFTHash}`} target="_blank" className='text-primary'>{ mintedNFTHash }</a></p>}
                  <DisplayNfts address={address} contractAddr={contractAddr}/>
                </div>
              </div>
            }
          </div>
          :
          <div className='text-center'>
            <h4 className='text-warning'>{ msg }</h4>
          </div>
        }
      </Container>      
		</div>
	)
}
