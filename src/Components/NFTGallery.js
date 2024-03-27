import React, { useState, useEffect } from 'react';
import './NFTGallery.css';
import { ethers } from 'ethers';
import { Biconomy } from "@biconomy/mexa";
import MyContractABI from './MyContractABI.json';


const NFTGallery = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const contractAddress = "0xFDA1A112dDEd44136Ff07077faF5ce9FcCc0B729";
  let biconomy; 
  const biconomyApiKey = "7npoHVRUn.e9adfc1c-cb73-4dc3-862e-7ae3f9858994";

  // Assuming you're going to have 10 NFTs
  const nfts = [{
        id: 1,
        name: 'NFT 1' ,
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmYR3wH9dVGCNfcM4VQzZibNX9sc1XCcVP1e8N16thG4QF' // Use real image URLs here
      },
      { 
        id: 2, 
        name: 'NFT 2', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmbAm2J2qyiGgs9FFkkqbE7jD96MutRMgs6Mtw6wwbsXRY' 
      },
      { 
        id: 3, 
        name: 'NFT 3', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmZ1eSFo7qt8KqxPz7jXyqo9Yn1FtHj4kyCLL2ucJoXyru' 
      },
      { 
        id: 4, 
        name: 'NFT 4', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmTPgZZaKc59TuDaan2PWkFQepmD2ZpUpvKDrF1AE1d2no' 
      },
      { 
        id: 5, 
        name: 'NFT 5', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmQxhZnDYFSLB33VtmWqXu4gQ88jV4RDFk8MxyYZSrTBFp' 
      },
      { 
        id: 6, 
        name: 'NFT 6', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmeY66UrDB5Uf9z34nuoCUFJ25Pq6ab5KzJyEMPUTSbKGV' 
      },
      { 
        id: 7, 
        name: 'NFT 7', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmWFEMyYb3cw6rBoBnm8Ka6knahUg6AvVa4xG37Z88hqyF' 
      },
      { 
        id: 8, 
        name: 'NFT 8', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmVDf81gB9whWW6M6cK3noRzba4r6gK5LCtVGJV2yCti8W' 
      },
      { 
        id: 9, 
        name: 'NFT 9', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmZgHKW8XceWktrSnBQw2SCXDfCyAKFEzyCRErKMcPr8bk' 
      },
      { 
        id: 10, 
        name: 'NFT 10', 
        image: 'https://moccasin-hilarious-coyote-285.mypinata.cloud/ipfs/QmSyqAwAZHAsdjXdUAVxHFMUFXrfxWFUJK9a5v6PxL2UjG' 
      }
      
    
  ]

  useEffect(() => {
    if (window.ethereum) {
      initBiconomy();
    }
  }, []);

  const initBiconomy = async () => {
    biconomy = new Biconomy(window.ethereum, {
      apiKey: "7npoHVRUn.e9adfc1c-cb73-4dc3-862e-7ae3f9858994",
      debug: true,
    });

    biconomy.onReady(async () => {
      await connectWallet();
    });
  };
  const connectWallet = async () => {
    if (window.ethereum) { // Check if MetaMask is installed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
        setIsWalletConnected(true); // Update state to reflect the wallet connection
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      // If MetaMask is not installed, redirect to the MetaMask extension/add-on page
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

    // Define toggleNFTSelection here
  const toggleNFTSelection = (nftId) => {
    setSelectedNFTs((prevSelected) =>
      prevSelected.includes(nftId)
        ? prevSelected.filter((id) => id !== nftId)
        : [...prevSelected, nftId]
    );
  };

  

  // const mintNFT = async (tokenURI) => {
  //   if (window.ethereum) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, MyContractABI, signer);

  //     try {
  //       const transaction = await contract.safeMint(signer.getAddress(), tokenURI);
  //       console.log('Transaction:', transaction);
  //       await transaction.wait();
  //       console.log('NFT Minted:', transaction.hash);
  //     } catch (error) {
  //       console.error('Minting failed:', error);
  //     }
  //   } else {
  //     console.log('Ethereum object not found, install MetaMask.');
  //   }
  // };
  const mintNFT = async (tokenURI) => {
    const biconomy = new Biconomy(window.ethereum, { apiKey: biconomyApiKey, debug: true });
    await biconomy.init();
    
    const provider = new ethers.providers.Web3Provider(biconomy);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MyContractABI.abi, signer);

    try {
      const transaction = await contract.safeMint(signer.getAddress(), tokenURI);
      console.log('Transaction:', transaction);
      await transaction.wait();
      console.log('NFT Minted:', transaction.hash);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };



  // const mintSelectedNFTs = async () => {
  //   if (selectedNFTs.length > 0) {
  //     const tokenURIs = selectedNFTs.map(id => nfts.find(nft => nft.id === id).image); // Assuming `image` holds your tokenURI
  //     if (window.ethereum) {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractAddress,MyContractABI, signer);

  //       try {
  //         const transaction = await contract.safeMintMultiple(signer.getAddress(), tokenURIs);
  //          console.log('Transaction:', transaction);
  //         await transaction.wait();
  //         console.log('Multiple NFTs Minted:', transaction.hash);
  //         setSelectedNFTs([]); // Clear selection after minting
  //       } catch (error) {
  //         console.error('Batch minting failed:', error);
  //       }
  //     } else {
  //       console.log('Ethereum object not found, install MetaMask.');
  //     }
  //   } else {
  //     console.log('No NFTs selected for minting.');
  //   }
  // };
  const mintSelectedNFTs = async () => {
    if (selectedNFTs.length > 0) {
      const tokenURIs = selectedNFTs.map(id => nfts.find(nft => nft.id === id).image);
      
      const biconomy = new Biconomy(window.ethereum, { apiKey: biconomyApiKey, debug: true });
      await biconomy.init();
      
      const provider = new ethers.providers.Web3Provider(biconomy);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, MyContractABI.abi, signer);

      try {
        const transaction = await contract.safeMintMultiple(signer.getAddress(), tokenURIs);
        console.log('Transaction:', transaction);
        await transaction.wait();
        console.log('Multiple NFTs Minted:', transaction.hash);
        setSelectedNFTs([]);
      } catch (error) {
        console.error('Batch minting failed:', error);
      }
    } else {
      console.log('No NFTs selected for minting.');
    }
  };

  return (
    <div className="gallery-wrapper">
      
      {!isWalletConnected && (
        <button onClick={connectWallet} className="connect-wallet-btn">
          Connect Wallet
        </button>
      )}
      
      <div className="nft-gallery">
        {nfts.map((nft) => (
          <div className="nft-card" key={nft.id}>
            <img className="nft-image" src={nft.image} alt={nft.name} />
            <button className="mint-btn" onClick={mintNFT}>
              Mint NFT
            </button>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedNFTs.includes(nft.id)}
                onChange={() => toggleNFTSelection(nft.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="mint-multiple-btn" onClick={mintSelectedNFTs} disabled={selectedNFTs.length === 0}>
        Mint Multiple
      </button>
    </div>
  );
};

export default NFTGallery;
