// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ReputationNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    address public bridgeAddress;

    mapping(uint256 => uint256) public tokenScores;
    mapping(uint256 => address) public tokenOldAddress;

    event Minted(address indexed to, uint256 indexed tokenId, uint256 score);

    // Constructor: `initialOwner` alacak şekilde düzeltildi
    constructor(address initialOwner)
        ERC721("Reputation Proof of Experience", "RPX")
        Ownable(initialOwner)
    {
        bridgeAddress = initialOwner;
    }

    modifier onlyBridge() {
        require(msg.sender == bridgeAddress, "Only the bridge can mint");
        _;
    }

    function setBridgeAddress(address _newBridgeAddress) public onlyOwner {
        bridgeAddress = _newBridgeAddress;
    }

    function mintNFT(address to, address oldAddress, uint256 score) public onlyBridge returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        tokenScores[tokenId] = score;
        tokenOldAddress[tokenId] = oldAddress;

        emit Minted(to, tokenId, score);
        return tokenId;
    }

    // _exists fonksiyonunu içeren doğru tokenURI fonksiyonu
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        uint256 score = tokenScores[tokenId];
        string memory scoreStr = Strings.toString(score);
        address oldAddr = tokenOldAddress[tokenId];

        return string(abi.encodePacked(
            "data:application/json;charset=utf-8,{\"name\":\"RPX Score NFT\", \"description\":\"Reputation Proof of Experience NFT verifying a link and score.\", \"score\":",
            scoreStr,
            ", \"linked_from_address\":\"",
            Strings.toHexString(uint160(oldAddr), 20),
            "\"}"
        ));
    }
}