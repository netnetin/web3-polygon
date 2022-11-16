import React, { useEffect, useState } from "react";
import { Row, Col, Card } from 'react-bootstrap';
// import { useRouter } from 'next/router'

function NftCard ({nft}) {
  //console.log ('DisplayNfts > NFT ' + JSON.stringify(nft));
  return (
    <Col>
      <Card style={{ width: '10rem',padding:'5px'}} className="bg-transparent border border-secondary text-muted">
        <Card.Img 
          variant="top" 
          style={{width:'100%',maxHeight:'20vw',objectFit:'cover'}}
          src={ getDisplayNftImage(nft) } 
        />
        <Card.Body>
          <Card.Text className='mb-0'>{ nft.title }</Card.Text>
          <Card.Text className='mb-0'><small>{ nft.description }</small></Card.Text>
          <Card.Text className='mb-0'><small>{ nft.contract.name }</small></Card.Text>
          <Card.Text className='mb-0'><small>{ nft.tokenId }</small></Card.Text>
        </Card.Body>
    </Card>
  </Col>
  )
}


//decides what is the best image to display for a NFT
function getDisplayNftImage (nft) {

  let imgUrl = nft.rawMetadata && nft.rawMetadata.image ? nft.rawMetadata.image : null;

  //case1: there is no image...display custom image
  if (!imgUrl) imgUrl = '/images/nft-default.png'

  //case2: if ENS, then display a custom image
  if (nft.contract.address == "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85") imgUrl = '/images/ens-logo.jpeg'

  //case3: if imgUrl is ipfs, then replace
  imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

	// console.log(imgUrl);
  return imgUrl
}

function IterateNfts({address, contractAddr}) {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  console.log ('DisplayNfts > address is ' + address);

/*   const router = useRouter()
  const { address } = router.query  
  const url = `/api/nfts/get/all/${address}`
 */

  useEffect(() => {
    setLoading(true)
    fetch('/api/getNFTs', { method:'POST', body:JSON.stringify({ address, contractAddr }) })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [address])

  if (isLoading) return <p>Loading...</p>
  if (!data.ownedNfts || data.ownedNfts.length === 0) return <p>This wallet does not have any NFTs!</p>

  let rows = [];

  data.ownedNfts.forEach((nft, index) => {
		// console.log('nft=', nft);
    rows.push(
      <NftCard
        nft={nft}
        key={nft.tokenId + index} />
    );
  });

  return (
    <Row xs={1} md={3} lg={4} className="g-4">
      {rows}
    </Row>
  )
}

export default IterateNfts;