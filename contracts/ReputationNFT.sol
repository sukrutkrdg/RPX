// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationNFT is ERC721, Ownable {
    // Sözleşme Adresi: Sadece bu adres NFT basabilir (Bu, ReputationBridge.sol adresi olacak)
    address public bridgeContractAddress;

    // NFT'nin özelliklerini tutan yapı (On-Chain Metadata)
    struct ReputationData {
        address oldAddress; // Aktarımın yapıldığı eski cüzdan adresi
        uint256 score;      // Aktarılan nihai itibar puanı
    }

    // tokenId'den İtibar Verisine haritalama
    mapping(uint256 => ReputationData) public reputationDatas;

    // Bir sonraki basılacak token ID'si
    uint256 private _nextTokenId = 1;

    // Constructor: Sadece NFT ismi ve sembolü atanır
    constructor() ERC721("Reputation Bridge NFT", "REP-X") {}

    // Sadece Bridge Sözleşmesinin çağırabileceği kısıtlama
    modifier onlyBridge() {
        require(msg.sender == bridgeContractAddress, "Yalnizca Bridge sozlesmesi basim yapabilir.");
        _;
    }

    // Bridge Sözleşmesinin adresini kurucu (Owner) ayarlar
    function setBridgeContract(address _bridgeAddress) public onlyOwner {
        require(_bridgeAddress != address(0), "Gecersiz adres.");
        bridgeContractAddress = _bridgeAddress;
    }

    // NFT Basımı Fonksiyonu (Bridge Sözleşmesi tarafından çağrılır)
    function mintNFT(address recipient, address _oldAddress, uint256 _score) public onlyBridge returns (uint256) {
        uint256 newItemId = _nextTokenId;

        // 1. Veriyi kaydet
        reputationDatas[newItemId] = ReputationData({
            oldAddress: _oldAddress,
            score: _score
        });

        // 2. Tokeni bas ve alıcıya gönder
        _safeMint(recipient, newItemId);
        
        // 3. Bir sonraki ID'yi hazırla
        _nextTokenId++;
        
        return newItemId;
    }
    
    // (Airdrop'çuların kolay sorgulaması için) İtibar skorunu döndürür
    function getReputationScore(uint256 tokenId) public view returns (uint256) {
        return reputationDatas[tokenId].score;
    }
    
    // Basit tokenURI (Metadata URL'si) döndüren bir implementasyon da burada yapılmalıdır.
    // Şimdilik basitleştiriyoruz, ama gerçekte harici bir metadata servisi gerekir.
}