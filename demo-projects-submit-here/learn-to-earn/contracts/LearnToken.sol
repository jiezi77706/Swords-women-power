// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // 或 ^0.8.24


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearnToken is ERC20, Ownable {
    // 代币经济参数
    uint256 public constant DAILY_REWARD = 50 ether;
    uint256 public constant COURSE_COMPLETION_REWARD = 200 ether;
    uint256 public constant QUIZ_EXCELLENT_REWARD = 100 ether;
    
    // 奖励分配记录
    mapping(address => uint256) public totalEarned;
    
    event RewardClaimed(address indexed user, uint256 amount, string reason);

    constructor() ERC20("LearnToken", "LRN") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    // 发放学习奖励
    function mintReward(address to, uint256 amount, string memory reason) external onlyOwner {
        _mint(to, amount);
        totalEarned[to] += amount;
        emit RewardClaimed(to, amount, reason);
    }
}