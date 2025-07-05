const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 开始部署智能合约到 Sepolia 测试网");

    // 获取部署者账户
    const [deployer] = await ethers.getSigners();
    console.log(`👤 部署者地址: ${deployer.address}`);
    console.log(`💼 账户余额: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);

    // 1. 部署 LearnToken 代币合约
    console.log("\n🔨 部署 LearnToken 代币合约...");
    const LearnToken = await ethers.getContractFactory("LearnToken");
    const token = await LearnToken.deploy();
    await token.deployed();
    console.log(`✅ LearnToken 已部署: ${token.address}`);

    // 2. 部署 AchievementNFT 成就合约
    console.log("\n🔨 部署 AchievementNFT 成就合约...");
    const AchievementNFT = await ethers.getContractFactory("AchievementNFT");
    const nft = await AchievementNFT.deploy();
    await nft.deployed();
    console.log(`✅ AchievementNFT 已部署: ${nft.address}`);

    // 3. 部署 RewardSystem 奖励系统合约
    console.log("\n🔨 部署 RewardSystem 奖励系统合约...");
    const RewardSystem = await ethers.getContractFactory("RewardSystem");
    const rewardSystem = await RewardSystem.deploy(token.address, nft.address);
    await rewardSystem.deployed();
    console.log(`✅ RewardSystem 已部署: ${rewardSystem.address}`);

    // 4. 转移 NFT 合约所有权到奖励系统
    console.log("\n🔄 转移 NFT 合约所有权到奖励系统...");
    const transferTx = await nft.transferOwnership(rewardSystem.address);
    await transferTx.wait();
    console.log("✅ NFT 所有权转移完成");

    // 5. 验证合约（如果配置了 Etherscan API Key）
    if (process.env.ETHERSCAN_API_KEY) {
        console.log("\n🔍 开始验证合约源代码...");

        try {
            console.log(`⏳ 验证 LearnToken (${token.address})...`);
            await hre.run("verify:verify", {
                address: token.address,
                constructorArguments: [],
            });
            console.log("✅ LearnToken 验证成功");
        } catch (error) {
            console.warn("⚠️ LearnToken 验证失败:", error.message);
        }

        try {
            console.log(`⏳ 验证 AchievementNFT (${nft.address})...`);
            await hre.run("verify:verify", {
                address: nft.address,
                constructorArguments: [],
            });
            console.log("✅ AchievementNFT 验证成功");
        } catch (error) {
            console.warn("⚠️ AchievementNFT 验证失败:", error.message);
        }

        try {
            console.log(`⏳ 验证 RewardSystem (${rewardSystem.address})...`);
            await hre.run("verify:verify", {
                address: rewardSystem.address,
                constructorArguments: [token.address, nft.address],
            });
            console.log("✅ RewardSystem 验证成功");
        } catch (error) {
            console.warn("⚠️ RewardSystem 验证失败:", error.message);
        }
    }

    // 部署总结
    console.log("\n🎉 部署完成！合约地址:");
    console.log(`- LearnToken: ${token.address}`);
    console.log(`- AchievementNFT: ${nft.address}`);
    console.log(`- RewardSystem: ${rewardSystem.address}`);

    // 保存地址到文件
    const fs = require("fs");
    const contracts = {
        learnToken: token.address,
        achievementNFT: nft.address,
        rewardSystem: rewardSystem.address,
        network: "sepolia",
        timestamp: new Date().toISOString(),
    };
    fs.writeFileSync("deployment.json", JSON.stringify(contracts, null, 2));
    console.log("\n📄 合约地址已保存到 deployment.json");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署失败:", error);
        process.exit(1);
    });