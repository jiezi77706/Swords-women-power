# Feminist Quote Board - 女性主义格言板

一个结合传统Web技术和区块链技术的现代化知识分享平台，专注于女性主义思想、哲学和社会学领域的内容传播。

## 🌟 项目特色

- **双数据源架构**：同时支持传统数据库和区块链存储
- **现代化UI设计**：响应式布局，支持深色模式
- **Web3集成**：完整的区块链功能支持
- **类型安全**：完整的TypeScript支持
- **可扩展性**：模块化设计便于功能扩展

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 15.2.4** - React全栈框架
- **React 19** - 用户界面库
- **TypeScript 5** - 类型安全的JavaScript
- **Tailwind CSS 3.4.17** - 原子化CSS框架
- **Framer Motion** - 动画库
- **Radix UI** - 无样式的可访问组件库

### 后端和数据存储
- **Supabase** - 开源Firebase替代品，PostgreSQL数据库
- **Ethers.js** - 以太坊钱包连接和智能合约交互
- **智能合约** - 基于以太坊的去中心化数据存储

### 开发工具
- **pnpm** - 包管理器
- **PostCSS** - CSS处理
- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查

## 📁 项目结构

```
background-paths/
├── app/                    # Next.js App Router页面
│   ├── page.tsx           # 首页
│   ├── quotes/            # 格言墙
│   ├── daily-draw/        # 每日抽签
│   ├── books/             # 书籍世界
│   ├── women/             # 杰出女性
│   ├── resources/         # 学习资源
│   ├── subscribe/         # 订阅更新
│   └── friendly-comments/ # 友好评论
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── wallet-connect.tsx # 钱包连接组件
│   └── kokonutui/        # 自定义组件
├── lib/                  # 工具库和服务
│   ├── web3.ts          # Web3管理
│   ├── supabase.ts      # 数据库客户端
│   ├── quotes.ts        # 格言服务
│   └── utils.ts         # 工具函数
├── hooks/               # 自定义Hooks
├── styles/              # 样式文件
├── public/              # 静态资源
└── docs/                # 文档
    ├── architecture-diagrams.md
    └── smart-contract-details.md
```

## 🚀 核心功能

### 1. 格言墙 (Quotes Wall)
- **双数据源**：支持传统数据库和区块链存储
- **实时同步**：自动同步区块链和数据库数据
- **用户交互**：支持添加、查看、删除格言
- **评论系统**：基于区块链的去中心化评论

### 2. 每日抽签 (Daily Draw)
- **随机展示**：每天随机展示格言或书籍推荐
- **多源数据**：从数据库和区块链随机选择
- **用户激励**：鼓励用户每日访问

### 3. 书籍世界 (Books)
- **分类浏览**：按哲学、文学、社会学等分类
- **详细信息**：包含书籍介绍、作者信息
- **推荐系统**：精选优质书籍推荐

### 4. 杰出女性 (Women)
- **人物档案**：展示杰出女性的生平和成就
- **分类展示**：按领域和时期分类
- **教育意义**：传播女性主义思想

### 5. 学习资源 (Resources)
- **资源聚合**：汇集优质学习资源
- **分类管理**：按类型和主题分类
- **外部链接**：提供相关网站和文章链接

### 6. 订阅更新 (Subscribe)
- **邮件订阅**：获取最新内容更新
- **个性化**：支持个性化订阅偏好
- **营销工具**：用户增长和留存

## 🔗 智能合约

### 合约地址
```
0xe2fc71225f9681418c2bf41ed64fc9cbfe7b737c
```

### 主要功能
- **submitQuote** - 提交格言到区块链
- **commentOnQuote** - 为格言添加评论
- **getLatestQuotes** - 获取最新格言
- **getCommentsByQuote** - 获取格言评论

### 数据结构
```solidity
struct Quote {
    uint256 id;
    string content;
    string authorName;
    string origin;
    address user;
    uint256 timestamp;
}

struct Comment {
    uint256 id;
    uint256 quoteId;
    address commenter;
    string content;
    uint256 timestamp;
}
```

## 🛠️ 开发指南

### 环境要求
- Node.js 18+
- pnpm 8+
- MetaMask 或其他Web3钱包

### 安装依赖
```bash
pnpm install
```

### 开发环境
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

### 启动生产环境
```bash
pnpm start
```

## 🔧 配置说明

### 环境变量
```env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 智能合约配置
NEXT_PUBLIC_CONTRACT_ADDRESS=0xe2fc71225f9681418c2bf41ed64fc9cbfe7b737c

# RPC端点
NEXT_PUBLIC_RPC_ENDPOINTS=https://eth.llamarpc.com,https://rpc.flashbots.net
```

### 数据库配置
项目使用Supabase作为主要数据库，包含以下表：
- `swordsdata` - 格言数据表
- `quotes` - 区块链格言同步表
- `comments` - 评论数据表

## 📊 性能优化

### 前端优化
- **代码分割**：按路由和组件分割代码
- **图片优化**：使用Next.js Image组件
- **缓存策略**：合理的缓存配置
- **懒加载**：组件和图片懒加载

### 区块链优化
- **多RPC端点**：备用RPC端点提高可用性
- **Gas优化**：合理的Gas费用估算
- **批量操作**：减少交易次数
- **错误处理**：完善的错误重试机制

## 🔒 安全考虑

### 前端安全
- **输入验证**：客户端和服务器端双重验证
- **XSS防护**：使用React的安全渲染
- **CSRF防护**：适当的CSRF令牌

### 区块链安全
- **合约审计**：智能合约安全审计
- **访问控制**：适当的权限管理
- **输入验证**：防止恶意输入

## 🚀 部署

### Vercel部署
1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署

### 其他平台
支持部署到Netlify、Railway等平台

## 📈 监控和分析

### 性能监控
- **Core Web Vitals**：页面性能指标
- **错误追踪**：前端错误监控
- **用户行为**：用户交互分析

### 区块链监控
- **交易状态**：交易确认监控
- **Gas费用**：Gas费用分析
- **合约事件**：事件监听和分析

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

- 项目地址：[GitHub Repository]
- 问题反馈：[Issues]
- 功能建议：[Discussions]

---

## 🎯 项目愿景

Feminist Quote Board致力于创建一个去中心化的知识分享平台，通过结合传统Web技术和区块链技术，为用户提供一个安全、透明、永久的知识存储和分享环境。我们希望通过这个平台，传播女性主义思想，促进社会进步，为构建更平等的社会贡献力量。 