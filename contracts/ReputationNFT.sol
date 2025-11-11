// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ReputationNFT is ERC721, Ownable {
    address public bridgeContractAddress;

    struct ReputationData {
        address oldAddress;
        uint256 score;
    }

    mapping(uint256 => ReputationData) public reputationDatas;
    uint256 private _nextTokenId = 1;

    constructor() ERC721("Reputation Bridge NFT", "REP-X") Ownable(msg.sender) {}

    modifier onlyBridge() {
        require(msg.sender == bridgeContractAddress, "Yalnizca Bridge sozlesmesi basim yapabilir.");
        _;
    }

    function setBridgeContract(address _bridgeAddress) external onlyOwner {
        require(_bridgeAddress != address(0), "Gecersiz adres.");
        bridgeContractAddress = _bridgeAddress;
    }

    function mintNFT(
        address recipient,
        address _oldAddress,
        uint256 _score
    ) external onlyBridge returns (uint256) {
        uint256 newItemId = _nextTokenId;

        reputationDatas[newItemId] = ReputationData({
            oldAddress: _oldAddress,
            score: _score
        });

        _safeMint(recipient, newItemId);
        _nextTokenId++;

        return newItemId;
    }

    // 🔹 ownerOf kullanarak token kontrolü
    function getReputationScore(uint256 tokenId) external view returns (uint256) {
        require(ownerOf(tokenId) != address(0), "Token mevcut degil.");
        return reputationDatas[tokenId].score;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token mevcut degil.");
        return string(abi.encodePacked("https://metadata.rep-x.io/token/", Strings.toString(tokenId)));
    }
}
