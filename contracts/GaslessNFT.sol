// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "mexa/contracts/6/libs/BaseRelayRecipient.sol";
contract GaslessNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, BaseRelayRecipient {
    uint256 private _nextTokenId;
    mapping(string => uint8) existingURIs;

    constructor(address initialOwner)
        ERC721("GaslessNFT", "GNFT")
        Ownable(initialOwner)
    {
        _transferOwnership(initialOwner);
        
    }

    // Override the _msgSender() to use BaseRelayRecipient version
    function _msgSender() internal override(Context, BaseRelayRecipient) view returns (address) {
        return BaseRelayRecipient._msgSender();
    }

    // Override the _msgData() to use BaseRelayRecipient version
    function _msgData() internal override(Context, BaseRelayRecipient) view returns (bytes calldata) {
        return BaseRelayRecipient._msgData();
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://";
    }
    function safeMint(address to, string memory uri) public returns (uint256) {
        require (existingURIs[uri] != 1, "NFT Already Minted!");
        uint256 tokenId = _nextTokenId++;
        existingURIs[uri] = 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    function safeMintMultiple(address to, string[] memory uris) public {
        for(uint i = 0; i < uris.length; i++) {
            require(existingURIs[uris[i]] != 1, "NFT Already Minted!");
            uint256 tokenId = _nextTokenId++;
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uris[i]);
            existingURIs[uris[i]] = 1; // Mark this URI as minted
        }
    }


    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;  
    }
}
