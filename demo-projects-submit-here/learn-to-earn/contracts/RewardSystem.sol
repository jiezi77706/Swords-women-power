// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // 或 ^0.8.24

import "./LearnToken.sol";
import "./AchievementNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardSystem is Ownable {
    LearnToken public learnToken;
    AchievementNFT public achievementNFT;
    
    struct RewardRule {
        uint256 tokenAmount;
        string achievementTitle;
        string achievementDesc;
        string achievementURI;
    }
    
    mapping(string => RewardRule) public rewardRules;
    mapping(address => mapping(string => bool)) public hasClaimed;

    event RewardDistributed(
        address indexed user,
        string eventType,
        uint256 tokenAmount,
        uint256 achievementId
    );

    constructor(address _tokenAddress, address _nftAddress) {
        learnToken = LearnToken(_tokenAddress);
        achievementNFT = AchievementNFT(_nftAddress);
        
        // 初始化奖励规则
        rewardRules["daily_login"] = RewardRule(50 ether, "", "", "");
        rewardRules["course_complete"] = RewardRule(200 ether, "Course Master", "Completed a full course", "ipfs://Qm.../course_complete.json");
        rewardRules["quiz_excellent"] = RewardRule(100 ether, "Quiz Champion", "Scored 90+ on a quiz", "ipfs://Qm.../quiz_excellent.json");
    }

    // 发放奖励
    function distributeReward(address user, string memory eventType) external onlyOwner {
        require(!hasClaimed[user][eventType], "Reward already claimed");
        
        RewardRule memory rule = rewardRules[eventType];
        require(rule.tokenAmount > 0, "Invalid event type");
        
        // 发放代币奖励
        learnToken.mintReward(user, rule.tokenAmount, eventType);
        
        // 发放NFT成就
        uint256 achievementId = 0;
        if (bytes(rule.achievementTitle).length > 0) {
            achievementId = achievementNFT.mintAchievement(
                user,
                rule.achievementTitle,
                rule.achievementDesc,
                rule.achievementURI
            );
        }
        
        hasClaimed[user][eventType] = true;
        emit RewardDistributed(user, eventType, rule.tokenAmount, achievementId);
    }

    // 添加/更新奖励规则
    function setRewardRule(
        string memory eventType,
        uint256 tokenAmount,
        string memory achievementTitle,
        string memory achievementDesc,
        string memory achievementURI
    ) external onlyOwner {
        rewardRules[eventType] = RewardRule(
            tokenAmount,
            achievementTitle,
            achievementDesc,
            achievementURI
        );
    }
}