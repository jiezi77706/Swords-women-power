// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AchievementNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // 成就元数据
    struct Achievement {
        string title;
        string description;
        uint256 timestamp;
        string metadataURI;
    }
    
    // 用户成就记录
    mapping(address => Achievement[]) public userAchievements;
    mapping(uint256 => Achievement) public tokenAchievement;
    mapping(string => bool) private _achievementExists;

    event AchievementMinted(address indexed user, string title, uint256 tokenId);

    constructor() ERC721("LearnAchievement", "LRNACHV") {}

    // 铸造成就NFT
    function mintAchievement(
        address to,
        string memory title,
        string memory description,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        require(!_achievementExists[metadataURI], "Achievement already exists");
        
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        Achievement memory newAchievement = Achievement({
            title: title,
            description: description,
            timestamp: block.timestamp,
            metadataURI: metadataURI
        });
        
        _safeMint(to, tokenId); // 使用 _safeMint 替代 _mint
        userAchievements[to].push(newAchievement);
        tokenAchievement[tokenId] = newAchievement;
        _achievementExists[metadataURI] = true;
        
        emit AchievementMinted(to, title, tokenId);
        return tokenId;
    }

    // 获取用户所有成就
    function getUserAchievements(address user) public view returns (Achievement[] memory) {
        return userAchievements[user];
    }
    
    // 添加 tokenURI 函数
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenAchievement[tokenId].metadataURI;
    }
}