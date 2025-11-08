// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IOracle.sol"; // Oracle arayüzünü import ediyoruz
import "./ReputationNFT.sol"; // NFT sözleşmesini import ediyoruz

contract ReputationBridge is Ownable {
    // ... [Yapılar ve Mappingler (Önceki planımızdaki gibi)] ...
    
    struct LinkRecord {
        address newAddress; 
        uint256 linkTimestamp; 
        uint256 reputationScore; 
        bool isVerified; 
        bytes32 proofHash; 
    }

    mapping(address => LinkRecord) public links;

    // Protokol Ayarları
    address public oracleAddress; // Doğrulama Motorunun adresi
    ReputationNFT public nftContract; // Basılacak NFT Sözleşmesi
    address public feeReceiver;       // Ücretlerin toplandığı cüzdan
    uint256 public baseFee;           // Başlangıç Talep Ücreti
    uint256 public successFee;        // Başarılı Bağlama Ücreti (şimdilik bu projeye dahil değil, toplu çekilebilir)


    event LinkRequested(address indexed oldAddress, address indexed newAddress, bytes32 proofHash);
    event LinkVerified(address indexed oldAddress, address indexed newAddress, uint256 finalScore);

    // Constructor: İlk kurulumda temel ayarları yapar
    constructor(address _nftContractAddress, address _feeReceiver, uint256 _baseFee) {
        nftContract = ReputationNFT(_nftContractAddress);
        feeReceiver = _feeReceiver;
        baseFee = _baseFee;
        oracleAddress = msg.sender; // Başlangıçta deploy eden kişi Oracle yetkisini alır.
    }
    
    // Sadece Oracle'ın çağırabileceği kısıtlama
    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Yalnizca yetkili Oracle cagirabilir.");
        _;
    }

    // Oracle adresini güncelleme (sadece Owner)
    function setOracleAddress(address _newOracle) public onlyOwner {
        oracleAddress = _newOracle;
    }
    
    // 1. ADIM: Bağlama Talebi (Ücret Kontrollü)
    function requestLink(address _oldAddress, bytes32 _proofHash) public payable {
        // Kontrol 1: Başlangıç ücreti ödendi mi?
        require(msg.value == baseFee, "Talep ucreti, belirlenen baseFee'ye esit olmalidir.");
        // Kontrol 2: Bu adres daha önce talep etmedi mi?
        require(links[_oldAddress].newAddress == address(0), "Bu eski adres icin zaten bir talep var.");
        
        // Kayıt: Yeni Adres, işlemi yapan (msg.sender) adrestir.
        links[_oldAddress] = LinkRecord({
            newAddress: msg.sender,
            linkTimestamp: block.timestamp,
            reputationScore: 0, // Skor, Oracle tarafından atanacak
            isVerified: false,
            proofHash: _proofHash
        });

        // Ücreti Alıcı Cüzdana Gönder (Bu kısım isteğe göre basitleştirilebilir)
        (bool sent, ) = payable(feeReceiver).call{value: baseFee}("");
        require(sent, "BaseFee gonderilemedi.");

        emit LinkRequested(_oldAddress, msg.sender, _proofHash);
    }
    
    // 2. ADIM: Doğrulama ve NFT Basımı (Oracle Tarafından Çağrılır)
    function setVerificationStatus(address _oldAddress, bool _status, uint256 _finalScore) public onlyOracle {
        LinkRecord storage record = links[_oldAddress];
        require(record.newAddress != address(0), "Talep bulunamadi.");
        require(!record.isVerified, "Bu talep zaten dogrulanmis.");

        record.isVerified = _status;
        record.reputationScore = _finalScore;

        if (_status) {
            // Başarılıysa: NFT Basımı
            nftContract.mintNFT(record.newAddress, _oldAddress, _finalScore);
        }
        
        emit LinkVerified(_oldAddress, record.newAddress, _finalScore);
    }
    
    // (Diğer yardımcı fonksiyonlar buraya eklenecektir: Ücret/Oracle güncelleme vb.)
}